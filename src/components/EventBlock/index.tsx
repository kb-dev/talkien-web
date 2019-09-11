import moment from 'moment';
import React from 'react';

import './EvenBlock.scss';

interface Props {
    name: string;
    description: string;
    beginDate: moment.Moment;
    endDate?: moment.Moment;
    beginColor : string ;
    endColor : string ;
}

const EventBlock = (props: Props) => (
	<div className="data1">
		<div className="block">
			<div className="linear-gradient">
				<p className="title">{props.name}</p>
				<div className="empty" style={{backgroundImage: `linear-gradient(to right, ${props.beginColor}, ${props.endColor})`,}}></div>
			</div>
			<div className="info">
				<p className="information">
					{props.description}
				</p>
				<p className="dated">{props.beginDate}</p>
			</div>
		</div>
	</div>
);

export default EventBlock;