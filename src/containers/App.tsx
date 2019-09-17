import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from 'components/Header';
import SearchPage from 'pages/Search';
import ManagementPage from 'pages/Management';

import './App.scss';

const App: React.FC = () => (
	<div className="app">
		<Router>
			<Route component={Header} />
			<Route path="/" exact={true} component={SearchPage} />
			<Route path="/management/" component={ManagementPage} />
		</Router>
	</div>
);

export default App;
