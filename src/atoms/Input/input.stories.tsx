import { action } from '@storybook/addon-actions';
import backgrounds from '@storybook/addon-backgrounds';
import { boolean, number, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Input from './index';

const bg = backgrounds([
	{ name: 'BG low', value: '#b3d6eb', default: true },
	{ name: 'BG high', value: '#bbdef1' },
	{ name: 'White', value: 'white' },
]);

const HTML5 = 'html5';
const REACT = 'react';

const testMin = 0;
const testMax = 2;

storiesOf('Input', module)
	.addDecorator(withKnobs)
	.addDecorator(bg)
	.add('knobs', () => (
		<Input
			autoComplete={text('autocomplete', 'on', HTML5)}
			autoFocus={boolean('autofocus', false, HTML5)}
			checked={boolean('checked', false, HTML5)}
			className={text('class', '', REACT)}
			disabled={boolean('disabled', false, REACT)}
			focus={boolean('focus', false, HTML5)}
			forceValue={boolean('forceValue', false, REACT)}
			label={text('label', '', REACT)}
			name={text('name', '', HTML5)}
			max={number('max', undefined, HTML5)}
			maxLength={number('maxlength', undefined, HTML5)}
			min={number('min', undefined, HTML5)}
			minLength={number('minlength', undefined, HTML5)}
			pattern={text('pattern', undefined, HTML5)}
			placeholder={text('placeholder', 'Simple input', HTML5)}
			readOnly={boolean('readonly', false, HTML5)}
			required={boolean('required', false, HTML5)}
			size={number('size', undefined, HTML5)}
			style={object('style', {}, REACT)}
			type={text('type', 'text', HTML5)}
			value={text('value', '', HTML5)}
			onBlur={action('blur')}
			onClick={action('clicked')}
			onChange={action('change')}
			onFocus={action('focus')}
			onInput={action('input')}
			onKeyDown={action('keydown')}
			onKeyPress={action('keypress')}
		/>
	))
	.add('type="text"', () => (
		<div>
			<Input name="test" type="text" />
			<br />
			<Input name="test" type="text" placeholder="Here's a placeholder" />
			<br />
			<Input name="test" type="text" label="Here's a label" />
		</div>
	))
	.add('type="number"', () => (
		<div>
			<Input name="test" type="number" />
			<br />

			<Input name="test" type="number" placeholder="Here's a placeholder" />
			<br />

			<Input name="test" type="number" label="Here's a label" />
			<br />
			<Input
				name="test"
				type="number"
				placeholder="min === 0; max === 2"
				min={testMin}
				max={testMax}
			/>
		</div>
	));
