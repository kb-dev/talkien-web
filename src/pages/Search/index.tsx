import React from 'react';
import moment from 'moment';

import logo from 'assets/LogoTalkien.svg';
import Body from 'components/SearchBody';
import DataFetcher from 'tools/DataFetcher';

const MAX_EVENTS_TO_DISPLAY = 3;

type State = {
	eventsAreLoading: boolean;
	events: any;
	eventsToDisplay: Array<any>;
};

class SearchPage extends React.Component<any, State> {
	private eventsFetcher!: any;

	constructor(props) {
		super(props);

		this.state = {
			events: [],
			eventsAreLoading: false,
			eventsToDisplay: [],
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
				eventsToDisplay: this.getEventsToDisplay(state.data),
			});
		}
	};

	private onSearchChange = (e) => {
		const filteredEvents = this.getEventsToDisplay(this.state.events, e.currentTarget.value);

		this.setState({
			eventsToDisplay: filteredEvents,
		});
	};

	private getEventsToDisplay = (events: Array<any>, search?: string) => {
		let filteredEvents = events;

		if (search) {
			//Filtrage des évènements par ordre alphabetique et comparaison par rapport à la lettre tapée
			filteredEvents = events.filter((event) => {
				const valueToTest = event.name.toLowerCase(); //Convert maj on min

				return (
					valueToTest.substring(0, search.length) === search.substring(0, search.length)
				);
			});
		}

		const currentDate = moment(); //Date du jour

		filteredEvents = filteredEvents.filter((event) =>
			moment(event.startDate).isSameOrAfter(currentDate),
		);

		/*
		//Filtrage des évènements par date la plus proche du jour actuel
		let soonEvents = filteredEvents.sort((currentDate, event) => {
			if (moment(currentDate).isBefore(moment(event.startDate))) {
				return 1;
			} else if (moment(currentDate).isAfter(moment(event.startDate))) {
				return -1;
			}

			return 0;
		});*/

		//Trie des evenements par date
		filteredEvents.sort((event1, event2) => {
			if (moment(event1.startDate).isBefore(moment(event2.startDate))) {
				return -1;
			} else if (moment(event1.startDate).isAfter(moment(event2.startDate))) {
				return 1;
			}

			return 0;
		});

		if (filteredEvents.length > MAX_EVENTS_TO_DISPLAY) {
			return filteredEvents.slice(0, MAX_EVENTS_TO_DISPLAY);
		}

		return filteredEvents;
	};

	public componentDidMount() {
		this.eventsFetcher.fetch();
	}

	public render() {
		return (
			<>
				<object data={logo} className="logo-talkien" />
				<Body
					onSearchChange={this.onSearchChange}
					eventsToDisplay={this.state.eventsToDisplay}
				/>
			</>
		);
	}
}

export default SearchPage;
