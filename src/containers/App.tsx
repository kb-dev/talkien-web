import React from 'react';

import Header from 'components/Header';
import SearchPage from 'pages/Search';

import './App.scss';

const App: React.FC = () => (
	<div className="App">
		<Header />
		<SearchPage />
	</div>
);

export default App;
