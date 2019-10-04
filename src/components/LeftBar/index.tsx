import React from 'react';

import './LeftBar.scss';

class LeftBar extends React.Component<any> {
	public render() {
		return (
			<div className="left-bar-container">
				<div className="left-bar">
					<div className="items">
						<div className="new-events">
							<p className="new-events-text">Nouvel événement</p>
						</div>
						<div className="new-talk">
							<p className="new-talk-text">Nouveau talk</p>
						</div>
						<div className="draft-block">
							<div className="draft-event">Brouillons d'événements</div>
							<div className="justifie">
								<div className="little-bands"></div>
								<p className="my-event">Mon événement</p>
								<div className="bands"></div>
							</div>
							<div className="justifie">
								<div className="little-bands"></div>
								<p className="my-event2">Mon événement 2</p>
								<div className="bands"></div>
							</div>
						</div>
						<div className="draft-talks-block">
							<div className="draft-talks">Brouillons d'événements</div>
							<div className="justifie">
								<div className="little-bands"></div>
								<p className="my-talks">Mon talk </p>
								<div className="bands"></div>
							</div>
							<div className="justifie">
								<div className="little-bands"></div>
								<p className="my-talks2">Mon talk 2</p>
								<div className="bands"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LeftBar;
