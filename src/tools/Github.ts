const scopes = ['read:user', 'public_repo'];

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
	const response = await fetch(`http://localhost:9000/auth?code=${code}`, {
		method: 'GET',
	});

	const result = await response.json();

	if (!result.data) {
		throw new Error('Error during authentication');
	}

	// Auth is successful
};

export default {
	getAccessTokenFromCode,
	getAuthURL,
};
