/**
 *
 *	This module takes our cleaned IMDb data and with it creates a database for our Bacon tree. Starting off with
 *	Kevin Bacon himself, it finds all movies in which he stars and from that generates a list of child actors. It adds all
 *	these movies and child actors to the actors and movies collections in the db, and adds the link between each child actor and
 *	Kevin Bacon to the childToParent collection. It then recurses on those child actors, finding their child actors and adding them
 *	to the database, etc until 6 degrees of separation are reached.
 *
**/


const tsv = require('./tsvUtils');
const db = require('../dbController');


function getInfo({ children, movies }) {
	return Promise.all([
		children,
		tsv.getActorInfoByNconst(children),
		tsv.getMovieInfoByTconst(movies)
	]);
}


function getValidConsts(indexed, actors, actorInfo, movieInfo) {
	const nconsts = [];
	const tconsts = [];

	for (const [ nconst, path ] of actors) {
		const tconst = path[0][1];

		// Ensure that for every child actor we add, we have corresponding actor info and movie info
		if (actorInfo.has(nconst) && (movieInfo.has(tconst) || indexed.has(tconst))) {
			nconsts.push(nconst);

			if (!indexed.has(tconst)) {
				tconsts.push(tconst);
				indexed.add(tconst);
			}
		}
	}

	return [nconsts, tconsts];
}


function genActorDocs(nconsts, paths, actorInfo) {
	return nconsts.map((nconst) => {
		const doc = actorInfo.get(nconst);
		doc.parents = paths.get(nconst);

		return doc;
	});
}


// Arugment parents is a map of nconsts to their bacon path arrays (the eventual parent attribute of the actor documents).
// It holds the actors whose children we are currently searching for. indexedActors and indexedMovies are sets
// of nconsts and tconsts, respectively, of actors/movie already added to the db which should be ignored.
function buildDatabase(parents, indexedActors, indexedMovies, depth) {
	if (depth === 7) {
		return;
	}

	tsv.getChildren(parents, indexedActors, indexedMovies)
		.then(getInfo)
		.then((info) => {
			const [ nconsts, tconsts ] = getValidConsts(indexedMovies, ...info);

			nconsts.forEach((nconst) => indexedActors.add(nconst));

			const actorDocs = genActorDocs(nconsts, ...info);
			const movieDocs = tconsts.map((tconst) => info[2].get(tconst));

			db.addActorsMovies(actorDocs, movieDocs);

			console.log(`finished pass, added ${actorDocs.length} actors and ${movieDocs.length} movies`);

			buildDatabase(info[0], indexedActors, indexedMovies, depth + 1);
		})
		.catch((err) => console.log(err));
}


// Clear db and generate Bacon tree. 102 is the nconst for Kevin Bacon.
db.resetDb()
	.then(() => buildDatabase(new Map([[ 102, [] ]]), new Set([ 102 ]), new Set(), 1))
	.then(() => db.createTexIndex())
	.catch((err) => console.log(err));

