import DataFetcher from './DataFetcher';

const scopes = ['read:user', 'public_repo'];
const GITHUB_API_URL = 'https://api.github.com';
const subscribers: Array<any> = [];
let connected = false;

if (sessionStorage.getItem('token')) {
	connected = true;
}

const getAuthURL = async () => {
	const response = await fetch('http://localhost:9000/clientId', { method: 'GET' });

	const result = await response.json();

	if (!result.data) {
		// TODO: add user notification of error
		throw new Error('Cannot get clientId from auth server');
	}

	return `https://github.com/login/oauth/authorize?client_id=${result.data}&scope=${scopes.join(
		'%20',
	)}`;
};

const getAccessTokenFromCode = async (code: string) => {
	if (sessionStorage.getItem('token')) {
		return;
	}

	const response = await fetch(`http://localhost:9000/auth?code=${code}`, {
		method: 'GET',
	});

	const result = await response.json();

	if (!result.data) {
		throw new Error('Error during authentication');
	}

	if (!result.data.access_token) {
		throw new Error('Error: no access token returned by auth server');
	}

	sessionStorage.setItem('token', result.data.access_token);

	setConnected(true);
};

const getUserInformations = (callback) => {
	const token = sessionStorage.getItem('token');

	if (!token) {
		throw new Error('Error: no access token existing for this application');
	}

	const dataFetcher = new DataFetcher(`${GITHUB_API_URL}/user`, 'GET', callback);

	dataFetcher.setHeaders({
		Authorization: `Bearer ${token}`,
	});

	return dataFetcher;
};

const setConnected = (newValue) => {
	connected = newValue;

	subscribers.forEach((subscriber) => {
		subscriber(newValue);
	});
};

const isConnected = () => connected;

const subscribe = (cb: (connectedValue) => void) => {
	subscribers.push(cb);
};

export default {
	getAccessTokenFromCode,
	getAuthURL,
	getUserInformations,
	isConnected,
	subscribe,
};
