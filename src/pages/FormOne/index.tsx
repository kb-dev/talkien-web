import React from 'react';

import logo from 'assets/LogoTalkien.svg';

import './FormOne.scss';

class FormOne extends React.Component<any> {
	public render() {
		return (
			<div className="left-bar">
				<div className="new-events">
					<p className="new-events-text">Nouvel événement</p>
				</div>
			</div>
		);
	}
}

export default FormOne;
