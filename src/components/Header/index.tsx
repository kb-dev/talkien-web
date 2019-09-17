import React, { SyntheticEvent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TalkienLogo from 'assets/logo-talkien.svg';

import './Header.scss';

type State = {
	id: string;
};

class Header extends React.Component<any, State> {
	constructor(props) {
		super(props);
		this.state = {
			id: 'search',
		};
	}

	private elementsClick = (e: SyntheticEvent<HTMLElement>) => {
		this.setState({
			id: e.currentTarget.dataset.page || '',
		});
	};

	render() {
		return (
			<header className="App-header">
				<div className="header">
					<img src={TalkienLogo} className="talkien" />

						<Link
							to="/"
							className={`search ${this.state.id === 'search' ? 'selected' : ''}`}
							data-page="search"
							onClick={this.elementsClick}>Recherche
						</Link>
						<Link
							to="/management/"
							className={`management ${this.state.id === 'management' ? 'selected' : ''}`}
							data-page="management"
							onClick={this.elementsClick}>
							Gestion
						</Link>
						<Link
							to="/github/"
							className={`gitHub ${this.state.id === 'gitHub' ? 'selected' : ''}`}
							data-page="gitHub"
							onClick={this.elementsClick}>
							GitHub
						</Link>

				</div>
			</header>
		);
	}
}

export default Header;
