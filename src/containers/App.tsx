import React from 'react';

import logo from 'assets/LogoTalkien.svg';
import Header from 'components/Header';
import Body from 'components/Body';

import './App.scss';

const App: React.FC = () => (
	<div className="App">
		<object data={logo} className="LogoTalkien" />
		<Header />
		<Body />
		
	</div>
);

export default App;
