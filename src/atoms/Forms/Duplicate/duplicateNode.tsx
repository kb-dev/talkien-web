'use strict';

import React, { Component, ComponentClass } from 'react';

import Button from 'atoms/Button';
import { Event } from 'tools/types';

interface Props {
	attributes?: unknown;
	removeDisplayed?: boolean;
	onChangeProperty?: string;
	element: React.ComponentClass | React.FunctionComponent;
	deleteButtonContent?: string | JSX.Element;
	index: number;
	isRemovable: boolean;
	values: unknown;
	id: string;
	withOnDelete?: boolean;

	onChange(index: number, e: Event<any>): void;
	onDelete?(index: number): void;
}

export default (props: Props) => {
	const onChildChange = ({ name, invalidateOthers, value }: Event<any>) => {
		props.onChange(props.index, {
			invalidateOthers,
			name,
			value,
		});
	};

	const onDelete = () => {
		if (props.onDelete) {
			props.onDelete(props.index);
		}
	};

	const elementProperties: any = {
		index: props.index,
		values: props.values,
		...(props.attributes || {}),
	};

	if (!props.onChangeProperty) {
		elementProperties.onChange = onChildChange;
	} else {
		elementProperties[props.onChangeProperty] = onChildChange;
	}

	if (props.withOnDelete && props.isRemovable) {
		elementProperties.onDelete = onDelete;
	}

	return (
		<div className="duplicatedContainer">
			<div className="duplicatedElement">
				{React.createElement(props.element as any, elementProperties)}
			</div>
			{props.removeDisplayed && props.isRemovable && (
				<Button onClick={onDelete} className="buttonContainer delete-button">
					{props.deleteButtonContent || '-'}
				</Button>
			)}
		</div>
	);
};
