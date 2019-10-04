import React from 'react';

import EventBlock from 'components/EventBlock';
import logo from 'assets/LogoTalkien.svg';
import './SearchBody.scss';

interface Props {
	eventsToDisplay: Array<any>;

	onSearchChange(e): void;
}

function SearchBody(props: Props) {
	return (
		<div className="search-body-container">
			<img src={logo} className="logo-talkien" />
			<div className="contain">
				<div className="container">
					<div className="question-answers">
						<div className="question"> Quel événement cherchez-vous ?</div>
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
					<div className="question-add">
						Vous souhaitez ajouter un événement ou une conférence ?
					</div>
					<div className="answer-add">Accédez à l'interface de gestion par ici.</div>
				</div>
			</div>
		</div>
	);
}

export default SearchBody;
