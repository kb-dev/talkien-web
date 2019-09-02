import { action } from '@storybook/addon-actions';
import backgrounds from '@storybook/addon-backgrounds';
import { boolean, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import Button from './index';

const bg = backgrounds([
	{ name: 'BG low', value: '#b3d6eb', default: true },
	{ name: 'BG high', value: '#bbdef1' },
	{ name: 'White', value: 'white' },
]);

storiesOf('Button', module)
	.addDecorator(withKnobs)
	.addDecorator(bg)
	.add('knobs', () => (
		<Button
			enabled={boolean('enabled', true)}
			errorMessage={text('error message', undefined)}
			noCenterContainer={boolean('no center container', false)}
			successMessage={text('success message')}
			style={object('style', {})}
			type={text('type')}
			value={text('value')}
			onBlur={action('blur')}
			onClick={action('clicked')}>
			{text('children', 'Simple button')}
		</Button>
	))
	.add('base state', () => (
		<Button onBlur={action('blur')} onClick={action('clicked')}>
			Simple button
		</Button>
	))
	.add('with error', () => (
		<Button
			errorMessage={text('error message', 'This is an error message')}
			onBlur={action('blur')}
			onClick={action('clicked')}>
			Simple button
		</Button>
	))
	.add('with success', () => (
		<Button
			successMessage={text('success message', 'This is a success message')}
			onBlur={action('blur')}
			onClick={action('clicked')}>
			Simple button
		</Button>
	));
