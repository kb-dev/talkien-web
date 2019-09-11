import React from 'react';

import EventBlock from 'components/EventBlock';

import './Body.scss';

interface Props {
	eventsToDisplay: Array<any>;

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
				{props.eventsToDisplay.map((event) => (
					<EventBlock
						key={event.id}
						name={event.name}
						description={event.description}
						beginDate={event.beginDate}
						endDate={event.endDate}
						beginColor={event.beginColor}
						endColor={event.endColor}
					/>
				))}
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
