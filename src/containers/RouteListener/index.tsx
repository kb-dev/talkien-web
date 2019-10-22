import React from 'react';
import { BrowserRouter as Router, Route, withRouter, RouteComponentProps } from 'react-router-dom';

import Github from 'tools/Github';

interface RouteListenerProps extends RouteComponentProps<{}> {}

function getUrlParams(search) {
	const hashes = search.slice(search.indexOf('?') + 1).split('&');

	return hashes.reduce((params, hash) => {
		const [key, val] = hash.split('=');

		return Object.assign(params, { [key]: decodeURIComponent(val) });
	}, {});
}

class RouteListener extends React.Component<RouteListenerProps, any> {
	private analyzeRoute = () => {
		if (this.props.location.pathname === '/authCallback') {
			const parameters = getUrlParams(this.props.location.search);

			if (parameters.code) {
				Github.getAccessTokenFromCode(parameters.code);
			}
		}
	};

	public componentDidMount() {
		this.analyzeRoute();
	}

	public componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.analyzeRoute();
		}
	}

	public render() {
		return null;
	}
}

export default withRouter(RouteListener);
