import React from 'react';

import TalkienLogo from 'assets/logo-talkien.svg';

import './Header.scss';

function Header() {
	return (
		<header className="App-header">
			<div className="header">
				<img src={TalkienLogo} className="talkien" />
				<p className="search">Recherche</p>
				<p className="management">Gestion</p>
				<p className="gitHub">GitHub</p>
			</div>
		</header>
	);
}

export default Header;
