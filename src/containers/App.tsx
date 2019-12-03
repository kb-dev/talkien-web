import moment from 'moment';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'moment/locale/fr';

import Header from 'components/Header';
import SearchPage from 'pages/Search';
import ManagementPage from 'pages/Management';

import './App.scss';
import EventCreationPage from 'pages/EventCreationPage';

moment.locale('fr');

const App: React.FC = () => (
	<div className="app">
		<Router>
			<Header />
			<Route path="/" component={SearchPage} exact={true} />
			<Route path="/management/event" component={EventCreationPage} exact={true} />
			<Route path="/management/" component={ManagementPage} exact={true} />
		</Router>
	</div>
);

export default App;
