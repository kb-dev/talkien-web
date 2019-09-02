// tslint:disable:max-classes-per-file
import { action } from '@storybook/addon-actions';
import backgrounds from '@storybook/addon-backgrounds';
import { boolean, number, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Button from '@atoms/Button';
import Input from '@atoms/Input';

import Form, { Duplicator, ErrorDisplay, InputContainer } from './index';

const bg = backgrounds([{ name: 'Dark', value: '#171721' }]);

const simpleElementToDuplicate = (props) => <div>A duplicate element</div>;
const simpleInput = (props) => (
	<InputContainer>
		<Input type="text" name="test" label="Test field" onChange={props.onChange} />
		<ErrorDisplay for="test" index={props.index} />
	</InputContainer>
);

const simpleDuplicator = (props) => (
	<Duplicator
		defaultValues={{ price: 0 }}
		id={'somethingId'}
		view={simpleInput}
		validators={{
			test: [
				{
					fn: (v) => !!v,
					message: 'Error: field needed',
				},
			],
		}}
		withAddButtons={true}
		withDeleteButtons={true}
		onChange={props.onChange}
	/>
);

class TestForm extends Form {
	private duplicateFunction: () => JSX.Element;

	constructor(props) {
		super(props);

		this.duplicateFunction = this.createDuplicateRenderFunction({
			defaultValues: { price: 0 },
			deleteButton: <div style={{ borderColor: 'red', borderWidth: '1px' }}>Remove test</div>,
			id: 'someId',
			view: simpleDuplicator,
			withAddButtons: false,
			withDeleteButtons: true,
		});

		this.addValidator('someValue', (v) => !!v, 'Error: value needed');
	}

	getInitialState() {
		return {
			formData: {},
		};
	}

	createElement = () => {
		const addSomeValueElement = this.getAddElementFunctionForDuplicate('someValue');

		if (addSomeValueElement) {
			addSomeValueElement();
		}
	};

	render() {
		return this.getForm(
			<div>
				Mon Formulaire
				<Button onClick={this.createElement}>Add one element</Button>
				<InputContainer>
					<Input name="someValue" type="text" onChange={this.onValueChanged} />
					<ErrorDisplay for="someValue" />
				</InputContainer>
				{this.duplicateFunction()}
			</div>,
		);
	}
}

storiesOf('Form', module)
	.addDecorator(withKnobs)
	.addDecorator(bg)
	.add('with duplicate button', () => <TestForm data={{}} />);
