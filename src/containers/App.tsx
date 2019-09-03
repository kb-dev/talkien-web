import React from 'react';

import logo from 'assets/logo.svg';

import './App.scss';

const App: React.FC = () => {
	return (
		<div className="App">
			<header className="App-header">
				<div className="Rectangle">
					<p className="TALKIEN">TALKIEN</p>
					<p className="Recherche">Recherche</p>
					<p className="Gestion">Gestion</p>
					<p className="GitHub">GitHub</p>
				</div>
				
			</header>
		</div>
	);
};

export default App;
