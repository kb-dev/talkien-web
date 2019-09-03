import React from 'react';

import logo from 'assets/logo.svg';
import Header from 'components/Header';

import './App.scss';

const App: React.FC = () => {
	return (
		<div className="App">
			<header className="App-header">
				<Header />
			</header>
		</div>
	);
};

export default App;
