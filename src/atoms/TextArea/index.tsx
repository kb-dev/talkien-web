'use strict';

import React, { CSSProperties, Component, useRef } from 'react';

import { Event } from 'tools/types';

import './textarea.scss';

export interface ITextAreaProps {
	className?: string;
	label?: string;
	focus?: boolean;
	name: string;
	placeholder?: string;
	readOnly?: boolean;
	rows?: number;
	style?: CSSProperties;
	value?: string;

	onChange?(e: Event): void;
	onSelect?(e: Event<{ start: number; end: number }>): void;
}

export default (props: ITextAreaProps) => {
	const {className, label, value, onChange, onSelect, ...attributes } = props;
	let nameDiv;

	const textAreaRef = useRef(null);

	const onLabelClick = () => {
		const textArea: any = textAreaRef.current;

		if (textArea) {
			textArea.focus();
		}
	};

	if (label) {
		nameDiv = (
			<label onClick={onLabelClick} htmlFor={props.name}>
				{`${label}`}
			</label>
		);
	}

	const internalOnChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
		if (props.onChange) {
			props.onChange({ value: e.currentTarget.value, name: props.name });
		}
	};

	const internalOnSelect = (e: any) => {
		if (props.onSelect) {
			props.onSelect({
				name: props.name,
				value: {
					end: e.target.selectionEnd,
					start: e.target.selectionStart,
				},
			});
		}
	};

	return (
		<div
			className={`input-component ${className || ''}`}>
			{label && nameDiv}
			<textarea
				ref={textAreaRef}
				value={value || ''}
				className={`textarea ${className}`}
				onChange={internalOnChange}
				onSelect={internalOnSelect}
				{...attributes}
			/>
		</div>
	);
};
