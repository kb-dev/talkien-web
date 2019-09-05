import React from 'react';

import logo from 'assets/LogoTalkien.svg';
import Header from 'components/Header';
import Body from 'components/Body';
import DataFetcher from 'tools/DataFetcher';

type State = {
	eventsAreLoading: boolean;
	events?: any;
};

class SearchPage extends React.Component<any, State> {
	private eventsFetcher!: any;

	constructor(props) {
		super(props);

		this.state = {
			events: [],
			eventsAreLoading: false,
		};

		this.eventsFetcher = new DataFetcher(
			'https://raw.githubusercontent.com/kb-dev/talkien-events/master/events.json',
			'GET',
			this.onEventsFetched,
		);
	}

	private onEventsFetched = (state) => {
		if (state.loading) {
			this.setState({
				eventsAreLoading: true,
			});
		} else if (state.error) {
			console.error(state.error);

			this.setState({
				eventsAreLoading: false,
			});
		} else {
			this.setState({
				events: state.data,
				eventsAreLoading: false,
			});
		}
	};

	private onSearchChange = (e) => {
		console.log(e.currentTarget.value);
	};

	public componentDidMount() {
		this.eventsFetcher.fetch();
	}

	public render() {
		console.log('Events : ', this.state.events);

		return (
			<>
				<object data={logo} className="LogoTalkien" />
				<Body onSearchChange={this.onSearchChange} />
			</>
		);
	}
}

export default SearchPage;
