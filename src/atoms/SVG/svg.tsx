'use strict';

import React from 'react';

import './svg.scss';

const DEFAULT_SIZE = 100;

export interface ISVGProps {
	height?: number;
	width?: number;
	className?: string;
	onClick?(): void;
}

export default (viewBox, className, children): React.FC<ISVGProps> => (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		viewBox={viewBox}
		className={`svg-icon ${className || ''} ${props.className || ''}`}
		onClick={props.onClick}
		height={props.height || DEFAULT_SIZE}
		width={props.width || DEFAULT_SIZE}>
		{children}
	</svg>
);
