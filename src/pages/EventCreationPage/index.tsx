import React, { ReactComponentElement } from 'react';

import logo from 'assets/LogoTalkien.svg';
import Form, { ErrorDisplay } from 'atoms/Forms';
import Input from 'atoms/Input';
import LeafletMap from 'atoms/LeafletMap';
import EventForm from 'components/EventForm';
import LeftBar from 'components/LeftBar';
import TextArea from 'atoms/TextArea';
import { Event } from 'tools/types';
import { randomColor } from 'tools/color';

import './EventCreationPage.scss';

class EventCreationPage extends React.Component<any> {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<div className="event-container">
				<LeftBar />
				<object data={logo} className="logo-talkien" />
				<div className="right-block">
					<div className="block-event">
						<EventForm />
					</div>
				</div>
			</div>
		);
	}
}

export default EventCreationPage;
