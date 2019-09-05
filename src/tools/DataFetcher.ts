const Actions = {
	ERROR: 'ERROR',
	LOADING: 'LOADING',
	SUCCESS: 'SUCCESS',
};

export type DataState<T = any> = {
	data?: T;
	date: number;
	error?: string;
	loading: boolean;
};

type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

function dispatch(state, action, data, date: number) {
	switch (action) {
		case Actions.LOADING:
			return { loading: true, date };
		case Actions.ERROR:
			return { loading: false, error: data ? data.message : '', date };
		case Actions.SUCCESS:
			return { loading: false, data, date };
		default:
			return state;
	}
}

export default class DataFetcher<T> {
	private callback?: (state: DataState<T>) => void;
	private customResolver?: (r) => any;
	private method: string;
	private state: DataState<T>;
	private url: string;

	constructor(url: string, method: Method = 'GET', callback?: (state: DataState<T>) => void) {
		this.url = url;
		this.method = method;

		if (callback) {
			this.subscribe(callback);
		}

		this.state = { loading: false, date: Date.now() };
	}

	private _setState(s: DataState<T>) {
		this.state = s;

		if (this.callback) {
			this.callback(s);
		}
	}

	setCustomRequestResolver(resolver) {
		this.customResolver = resolver;
	}

	getState() {
		return this.state;
	}

	fetch = async (body?: any, endURL?: string) => {
		this._setState(dispatch(this.state, Actions.LOADING, undefined, Date.now()));

		const headers: any = {};

		if (body) {
			headers['Content-Type'] = 'application/json';
		}

		return fetch(`${this.url}${endURL || ''}`, {
			body: body ? JSON.stringify(body) : undefined,
			headers,
			method: this.method,
		})
			.then(async (r) => {
				if (this.customResolver) {
					return this.customResolver(r);
				}

				if (r.ok) {
					return r.json();
				}

				throw await r.json();
			})
			.then((result) => {
				this._setState(dispatch(this.state, Actions.SUCCESS, result, Date.now()));
			})
			.catch((e) => {
				this._setState(dispatch(this.state, Actions.ERROR, e, Date.now()));
			});
	};

	subscribe(callback: (state: DataState<T>) => void) {
		this.callback = callback;
	}

	unsubscribe() {
		this.callback = undefined;
	}
}
