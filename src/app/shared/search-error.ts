

export class SearchError {
	message: string;
	url?: string;

	constructor(name: string, errCode: number) {
		if (errCode === 404) {
			this.message = `${name} is not withing six degrees of Kevin Bacon`;
			this.url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${name.replace(/\s/g, '+')}&s=nm`;
		} else {
			this.message = `Internal Server Error: ${errCode}`;
		}
	}
}

