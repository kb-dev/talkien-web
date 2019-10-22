import moment from 'moment';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'moment/locale/fr';

import Header from 'components/Header';
import FormOne from 'pages/FormOne';
import ManagementPage from 'pages/Management';
import SearchPage from 'pages/Search';

import RouteListener from './RouteListener';

import './App.scss';

moment.locale('fr');

const App: React.FC = () => (
	<div className="app">
		<Router>
			<RouteListener />
			<Route component={Header} />
			<Route path="/" exact={true} component={SearchPage} />
			<Route path="/management/" component={ManagementPage} />
			<Route path="/FormOne/" component={FormOne} />
		</Router>
	</div>
);

export default App;
