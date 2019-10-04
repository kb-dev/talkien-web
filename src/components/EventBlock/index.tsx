import moment from 'moment';
import React from 'react';

import { computeIntermediateColor } from 'tools/color';

import './EvenBlock.scss';

interface Props {
	name: string;
	topics: string;
	startDate: moment.Moment;
	endDate?: moment.Moment;
	beginColor: string;
	endColor: string;
}

const EventBlock = (props: Props) => {
	const intermediateColor = computeIntermediateColor(props.beginColor, props.endColor);

	return (
		<div className="event-block">
			<div className="block">
				<div className="linear-gradient">
					<div
						className="title"
						style={{
							backgroundImage: `linear-gradient(to right, ${props.beginColor}, ${intermediateColor})`,
						}}>
						{props.name}
					</div>
					<div
						className="empty"
						style={{
							backgroundImage: `linear-gradient(to right, ${intermediateColor}, ${props.endColor})`,
						}}
					/>
				</div>
				<div className="info">
					<p className="information">{props.topics}</p>
				</div>
				<div className="info-dated">
					<p className="dated">
						{moment(props.startDate).format('Do MMMM YYYY')}
						<br />
						{moment(props.endDate).format('Do MMMM YYYY')}
					</p>
				</div>
			</div>
		</div>
	);
};

export default EventBlock;
