/**
 *
 *	This module has utilities to take a raw IMDb tsv and write a new tsv w/o information we do not need in correct formatting.
 *	These utilities also ensure improperly formatted rows are removed. Run/require this file to clean the data.
 *
**/


const tsv  = require('./tsvUtils');



// Takes title.basics.tsv, which holds all movies/tv shows/episodes etc in the dataset, and output only non pornographic feature film
// rows to movie.basics.tsv. It resolves to a set of tconsts for such movies which we need to clean title.principals.tsv.
function cleanBasics() {
	const basicsInput = {
		file: 'title.basics.tsv',
		matches: new Set(),
		cb(row) {
			// Parantheses correspond to tconst, type, and whether the movie is pornographic (0 for no, 1 for yes)
			const movie = row.match(/^(tt\d+)\t([^\t]+)\t[^\t]+\t[^\t]+\t([^\t])+\t[^\t]+\t[^\t]+\t[^\t]+\t[^\t\n]+\n$/);

			if (movie && movie[2] === 'movie' && movie[3] === '0') {
				this.matches.add(movie[1]);
			}
		}
	};


	const basicsOutput = {
		file: 'movie.basics.tsv',
		cb(row, stream) {
			// Parantheses correspond to tconst, type, title, is pornographic, and year released
			const movie = row.match(/^(tt\d+)\t([^\t]+)\t([^\t]+)\t[^\t]+\t([^\t])+\t([^\t]+)\t[^\t]+\t[^\t]+\t[^\t\n]+\n$/);

			if (movie && movie[2] === 'movie' && movie[4] === '0') {
				stream.write(`${movie[1]}\t${movie[3]}\t${movie[5]}\n`);
			}
		}
	};

	return tsv.traverseTSV(basicsInput, basicsOutput);
}



// Cleans name.basics.tsv to names.tsv, preserving only rows where actor/actress is one of the professions
// and filtering out everything but nconst, name, dob - dod, and professions. It resolves to the set of all nconsts
// of actors/actresses which we need for cleanPrincipals.
function cleanNames() {
	const namesInput = {
		file: 'name.basics.tsv',
		matches: new Set(),
		cb(row) {
			// First parantheses is nconst, second is comma joined list of top three professions
			const actor = row.match(/^(nm\d+)\t[^\t]+\t[^\t]+\t[^\t]+\t([^\t]+)\t[^\t\n]+\n$/);

			if (actor && (actor[2].includes('actor') || actor[2].includes('actress'))) {
				this.matches.add(actor[1]);
			}
		}
	};


	const namesOutput = {
		file: 'names.tsv',
		cb(row, stream) {

			// First parantheses is nconst, second is name, third is dob, dod, fourth is comma joined list of top three professions
			const actor = row.match(/^(nm\d+)\t([^\t]+)\t([^\t]+\t[^\t]+)\t([^\t]+)\t[^\t\n]+\n$/);

			if (actor && (actor[4].includes('actor') || actor[4].includes('actress'))) {
				let birthDeath = 'null';
				const [ dob, dod ] = actor[3].split('\t');
				const jobs = actor[4].replace(/(,)|(_)/g, '$1 ');

				// IMDb uses \N to mark either unkown info, or in the case of the dod of someone still living, n/a
				if (dob !== '\\N') {
					if (dod !== '\\N') {
						birthDeath = dob + ' - ' + dod;
					} else {
						birthDeath = dob + ' - present';
					}
				}

				stream.write(`${actor[1]}\t${actor[2]}\t${birthDeath}\t${jobs}\n`);
			}
		}
	};

	return tsv.traverseTSV(namesInput, namesOutput);
}



// Given a set of tconsts that represent feature films and a set of nconsts that represent actors/actresses,
// only output the rows of title.principals.tsv that represent a feature film and have at least one cast member
// in the set of actors/actresses.
function cleanPrincipals(tconsts, nconsts) {
	const principalsInput = {
		file: 'title.principals.tsv',
		matches: null,
		cb() {}
	};


	const principalsOutput = {
		file: 'movie.principals.tsv',
		cb(row, stream) {

			// Parantheses correspond to tconst and a comma separated list of principal cast member nconsts
			const movie = row.match(/^(tt\d+)\t([^\t\n]+)\n$/);

			if (movie && tconsts.has(movie[1])) {
				const actors = movie[2]
					.split(',')
					.filter((nconst) => nconsts.has(nconst));

				if (actors.length) {
					stream.write(`${movie[1]}\t${actors.join(',')}\n`);
				}
			}
		}
	};

	return tsv.traverseTSV(principalsInput, principalsOutput);
}


// Perform the actual cleaning
Promise.all([
	cleanBasics(),
	cleanNames()
])
	.then(([ tconsts, nconsts ]) => (
		cleanPrincipals(tconsts, nconsts)
	))
	.catch((err) => console.log(err));

