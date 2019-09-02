import React from 'react';

import './pageLoader.scss';

interface IPageLoaderProps {
	loading: boolean;
}

type State = {
	endTransition: boolean;
	loading: boolean;
	transitionTimeout?: any;
};

const TRANSITION_TIME_IN_MS = 250;

export default class PageLoader extends React.Component<IPageLoaderProps, State> {
	constructor(props) {
		super(props);

		this.state = {
			endTransition: !props.loading,
			loading: props.loading,
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.loading !== state.loading) {
			return { loading: props.loading, endTransition: false };
		}

		return {};
	}

	public componentDidUpdate = (prevProps, prevState) => {
		if (prevState.loading !== this.state.loading && this.state.loading === false) {
			if (this.state.transitionTimeout) {
				clearTimeout(this.state.transitionTimeout);
			}

			const timeout = setTimeout(() => {
				this.setState({
					endTransition: true,
				});
			}, TRANSITION_TIME_IN_MS);

			this.setState({
				transitionTimeout: timeout,
			});
		}
	};

	public render() {
		const { loading, endTransition } = this.state;

		return (
			<div className="page-loader">
				{(loading || !endTransition) && (
					<div className={`page-loader-animation ${loading ? '' : 'leave'}`}>
						<div className="animation-container">
							<div className="center-point" />
							<div className="circle circle1" />
							<div className="circle circle2" />
							<div className="circle circle3" />
						</div>
					</div>
				)}
				{!loading && (
					<div className={`page-loader-children ${loading ? '' : 'enter'}`}>
						{this.props.children}
					</div>
				)}
			</div>
		);
	}
}
