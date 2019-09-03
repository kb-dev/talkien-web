'use strict';

import React, { CSSProperties, Component } from 'react';

import { Event } from 'tools/types';

import './textarea.scss';

export interface ITextAreaProps {
	className?: string;
	name: string;
	placeholder?: string;
	readOnly?: boolean;
	rows?: number;
	style?: CSSProperties;
	value?: string;

	textAreaRef?(e: HTMLTextAreaElement): void;
	onChange?(e: Event): void;
	onSelect?(e: Event<{ start: number; end: number }>): void;
}

export default (props: ITextAreaProps) => {
	const { className, value, onChange, onSelect, textAreaRef, ...attributes } = props;

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
		<textarea
			ref={props.textAreaRef}
			value={value || ''}
			className={`textarea ${className}`}
			onChange={internalOnChange}
			onSelect={internalOnSelect}
			{...attributes}
		/>
	);
};
