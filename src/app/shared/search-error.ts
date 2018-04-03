

export class SearchError {
	message: string;
	name?: string;
	nconst?: number;
	url?: string;

	constructor(searchTerm: number | string, errCode: number) {
		if (errCode === 404) {
			this.message = `${searchTerm} is not `;

			if (typeof searchTerm === 'string') {
				this.name = searchTerm;
				this.message += 'within six degrees of Kevin Bacon';
				this.url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${this.name.replace(/\s/g, '+')}&s=nm`;
			} else {
				this.nconst = searchTerm;
				this.message += 'a valid index';
			}
		} else {
			this.message = `Internal Server Error: ${errCode}`;
		}
	}
}

