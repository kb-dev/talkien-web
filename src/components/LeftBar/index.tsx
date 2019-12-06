import React from 'react';

import './LeftBar.scss';

class LeftBar extends React.Component<any> {
	public render() {
		return (
			<div className="left-bar-container">
				<div className="left-bar">
					<div className="items">
						<div className="new-event">
							<button className="new-event-text">Nouvel événement</button>
						</div>
						<div className="new-talk">
							<button className="new-talk-text">Nouveau talk</button>
						</div>
						<div className="draft-block">
							<div className="draft-event">Brouillons d'événements</div>
							<div className="justifie">
								<div className="little-bands" />
								<p className="event">Mon événement</p>
								<div className="bands" />
							</div>
							<div className="justifie">
								<div className="little-bands" />
								<p className="event">Mon événement 2</p>
								<div className="bands" />
							</div>
						</div>
						<div className="draft-talks-block">
							<div className="draft-talks">Brouillons d'événements</div>
							<div className="justifie">
								<div className="little-bands" />
								<p className="talk">Mon talk</p>
								<div className="bands" />
							</div>
							<div className="justifie">
								<div className="little-bands" />
								<p className="talk">Mon talk 2</p>
								<div className="bands" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LeftBar;
