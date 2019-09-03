'use strict';

import React, { CSSProperties, Component } from 'react';

interface IFlexRowProps {
	children: JSX.Element | Array<JSX.Element | string> | string;
	className?: string;
	style?: CSSProperties;
}

interface IFlexColumnProps {
	children: JSX.Element | Array<JSX.Element | string> | string;
	className?: string;
	style?: CSSProperties;
}

interface IFlexBaselineProps {
	children: JSX.Element | Array<JSX.Element | string> | string;
	className?: string;
	style?: CSSProperties;
}

interface IFlexCenterProps {
	children: JSX.Element | Array<JSX.Element | string> | string;
	className?: string;
	style?: CSSProperties;
}

export const FlexRow = (props: IFlexRowProps) => (
	<div className={`flex-row ${props.className || ''}`} style={props.style}>
		{props.children}
	</div>
);
export const FlexColumn = (props: IFlexColumnProps) => (
	<div className={`flex-column ${props.className || ''}`} style={props.style}>
		{props.children}
	</div>
);
export const FlexBaseline = (props: IFlexBaselineProps) => (
	<div className={`flex-baseline ${props.className || ''}`} style={props.style}>
		{props.children}
	</div>
);
export const FlexCenter = (props: IFlexCenterProps) => (
	<div className={`flex-center ${props.className || ''}`} style={props.style}>
		{props.children}
	</div>
);
