import { FlexRow } from 'atoms/Flex';
import React, { Component } from 'react';

import './Chips.scss';

interface IChipsProps {
	children: string | number;
	className?: string;
	clickable?: boolean;
	color?: string;
	cssColor?: string;
	value?: boolean;

	onClick?(): void;
}

function getColorFor(props: IChipsProps) {
	if (props.cssColor) {
		return `var(${props.cssColor})`;
	} else if (props.color) {
		return props.color;
	}

	return undefined;
}

export default function Chips(props: IChipsProps) {
	return (
		<FlexRow>
			<div
				className={`chips ${props.value ? 'selected' : ''} ${
					props.clickable ? 'clickable' : ''
				} ${props.className}`}
				style={{ backgroundColor: getColorFor(props) }}
				onClick={props.onClick}>
				{props.children}
			</div>
		</FlexRow>
	);
}
