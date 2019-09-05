import moment from 'moment';
import React from 'react';

import EventBlock from 'components/EventBlock';

import './Body.scss';

interface Props {
	onSearchChange(e): void;
}

function Body(props: Props) {
	return (
		<div className="container">
			<div className="question-answers">
				<p className="question"> Quel événement cherchez-vous ?</p>
				<input
					onChange={props.onSearchChange}
					type="text"
					className="choice"
					placeholder="Veuillez entrer un événement"
				/>
			</div>
			<div className="group">
				<EventBlock
					name="BDX.io"
					description="Hello"
					beginDate={moment()}
					endDate={moment()}
					beginColor="#aebf10"
					endColor="#ff0000"
				/>
				<EventBlock
					name="DevFest"
					description="Hello"
					beginDate={moment()}
					beginColor="#aebf10"
					endColor="#ff0000"
				/>
				<EventBlock
					name="BDX.io"
					description="Hello"
					beginDate={moment()}
					endDate={moment()}
					beginColor="#aebf10"
					endColor="#ff0000"
				/>
			</div>

			<div className="add-events">
				<p className="question-add">
					Vous souhaitez ajouter un événement ou une conférence ?
				</p>
				<p className="answer-add">Accédez à l'interface de gestion par ici.</p>
			</div>
		</div>
	);
}

export default Body;
