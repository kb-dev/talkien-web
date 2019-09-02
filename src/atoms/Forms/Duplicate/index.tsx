'use strict';
import React, { Component } from 'react';

import Button from 'atoms/Button';
import { Event } from 'tools/types';

import DuplicateNode from './duplicateNode';

import './duplicate.scss';

interface IDuplicate {
	addButtonContent?: string | JSX.Element;
	addDisplayed?: boolean;
	removeDisplayed?: boolean;
	deleteButtonContent?: string | JSX.Element;
	attributes?: unknown;
	id: string;
	name?: string;
	values?: Array<any>;
	view: React.ComponentClass | React.FunctionComponent;
	withOnDelete?: boolean;
	defaultValues?: any;

	addElement?(): void;
	getValues?(): any;
	onChange(index: number, event: Event<any>): void;
	removeElement?(index: number): void;
}

export default function Duplicate(props: IDuplicate) {
	let values = props.values || [];

	if (props.getValues) {
		values = props.getValues();
	}

	const isRemovable = values.length > 1;

	return (
		<div className="duplicate">
			{values.map((valuesElement, index) => {
				return (
					<DuplicateNode
						attributes={props.attributes}
						key={props.id + valuesElement._id}
						id={props.id}
						index={index}
						deleteButtonContent={props.deleteButtonContent}
						element={props.view}
						values={valuesElement}
						isRemovable={isRemovable}
						onChange={props.onChange}
						onDelete={props.removeElement}
						removeDisplayed={props.removeDisplayed}
						withOnDelete={props.withOnDelete}
					/>
				);
			})}
			{props.addDisplayed && (
				<Button onClick={props.addElement} className="add-button">
					{props.addButtonContent || '+'}
				</Button>
			)}
		</div>
	);
	//}
}
