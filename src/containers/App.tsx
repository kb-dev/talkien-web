import moment from 'moment';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'moment/locale/fr';

import Header from 'components/Header';
import SearchPage from 'pages/Search';
import ManagementPage from 'pages/Management';

import './App.scss';
import FormOne from 'pages/FormOne';
import TalkCreationPage from 'pages/TalkCreationPage';

moment.locale('fr');

const App: React.FC = () => (
	<div className="app">
		<Router>
			<Route component={Header} />
			<Route path="/" exact={true} component={SearchPage} />
			<Route path="/management/talk" component={TalkCreationPage} />
			<Route path="/management/" component={ManagementPage} />
			<Route path="/FormOne/" component={FormOne} />
		</Router>
	</div>
);

export default App;
