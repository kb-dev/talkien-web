import React, { SyntheticEvent } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import TalkienLogo from 'assets/logo-talkien.svg';
import './Header.scss';
import DataFetcher from 'tools/DataFetcher';
import GitHub from 'tools/Github';

type State = {
	avatar: string;
	dataAreLoading: boolean;
	id: string;
	login: string;
	name: string;
};

class Header extends React.Component<any, State> {
	private userInformationsFetcher: InstanceType<typeof DataFetcher>;

	constructor(props) {
		super(props);
		this.state = {
			avatar: '',
			dataAreLoading: false,
			id: 'search',
			login: '',
			name: '',
		};

		this.userInformationsFetcher = GitHub.getUserInformations(this.onUserInformationsFetched);
	}

	private onUserInformationsFetched = (state) => {
		if (state.loading) {
			this.setState({
				dataAreLoading: true,
			});
		} else if (state.error) {
			this.setState({
				dataAreLoading: false,
			});
		} else if (state.data) {
			this.setState({
				avatar: state.data.avatar_url,
				dataAreLoading: false,
				login: state.data.login,
				name: state.data.name,
			});
		}
	};

	private elementsClick = (e: SyntheticEvent<HTMLElement>) => {
		this.setState({
			id: e.currentTarget.dataset.page || '',
		});
	};

	public componentDidMount = () => {
		this.userInformationsFetcher.fetch();
	};

	public componentWillUnmount = () => {
		this.userInformationsFetcher.unsubscribe();
	};

	render() {
		return (
			<header className="app-header">
				<div className="header">
					<img src={TalkienLogo} className="talkien" />

					<Link
						to="/"
						className={`search ${this.state.id === 'search' ? 'selected' : ''}`}
						data-page="search"
						onClick={this.elementsClick}>
						Recherche
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
						className={`github ${this.state.id === 'github' ? 'selected' : ''}`}
						data-page="github"
						onClick={this.elementsClick}>
						GitHub
					</Link>

					<div className="auth">
						<div className="authname">
							<div className="username">{this.state.name}</div>
							<div className="pseudoname">{this.state.login}</div>
						</div>
						<img src={this.state.avatar} className="image" />
					</div>
				</div>
			</header>
		);
	}
}

export default Header;
