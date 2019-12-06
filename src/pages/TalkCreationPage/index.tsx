import React, { ReactComponentElement } from 'react';

import logo from 'assets/LogoTalkien.svg';
import TalkForm from 'components/TalkForm';
import LeftBar from 'components/LeftBar';


import './TalkCreationPage.scss';

class TalkCreationPage extends React.Component<any> {
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
						<TalkForm />
					</div>
				</div>
			</div>
		);
	}
}

export default TalkCreationPage;
