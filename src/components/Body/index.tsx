import React from 'react';

import EventBlock from 'components/EventBlock';

import './Body.scss';

interface Props {
	eventsToDisplay: Array<any>;

	onSearchChange(e): void;
}

function Body(props: Props) {
	return (
		<div className="contain">
			<div className="container">
				<div className="question-answers">
					<p className="question"> Quel événement cherchez-vous ?</p>
					<input
						type="text"
						onChange={props.onSearchChange}
						className="choice"
						placeholder="Veuillez entrer un événement"
					/>
				</div>
				<div className="group">
					{props.eventsToDisplay.map((event) => (
						<EventBlock
							key={event.id}
							name={event.name}
							topics={event.topics.join(', ')}
							startDate={event.startDate}
							endDate={event.endDate}
							beginColor={event.colors[0]}
							endColor={event.colors[1]}
						/>
					))}
				</div>
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
