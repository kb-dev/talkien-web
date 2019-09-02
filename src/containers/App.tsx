import React from 'react';

import logo from 'assets/logo.svg';

import './App.scss';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="app">
				<header className="app-header">
					<img src={logo} className="app-logo" alt="logo" />
					<p>Hello, world!</p>
					<a
						className="app-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer">
						Learn React
					</a>
				</header>
			</div>
		);
	}
}
