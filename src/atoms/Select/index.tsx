import React from 'react';

import CaretDown from 'atoms/SVG/Caret/Down';
import Translator from 'tools/Translator';
import { Event } from 'tools/types';

import './select.scss';

interface ISelectProps<T> {
	className?: string;
	disabled?: boolean;
	isMandatory?: boolean;
	label?: string;
	name: string;
	options?: Array<{ key: string; value: T }>;
	placeholder?: string;
	type?: string;
	value?: T;

	onChange(e: Event<string>): void;
}

type State = {
	dropdownDisplayed: boolean;
};

export default class Select<T extends string | number> extends React.Component<
	ISelectProps<T>,
	State
> {
	constructor(props) {
		super(props);

		this.state = {
			dropdownDisplayed: false,
		};
	}

	private onSelectClick = () => {
		if (!this.props.disabled) {
			this.setState({
				dropdownDisplayed: !this.state.dropdownDisplayed,
			});
		}
	};

	private onSelectBlur = () => {
		this.setState({
			dropdownDisplayed: false,
		});
	};

	private onElementClick = (e) => {
		let value = e.currentTarget.dataset.value;

		if (this.props.type === 'number') {
			try {
				value = parseInt(value, 10);
			} catch (e) {
				value = 0;
			}
		}

		this.props.onChange({
			name: this.props.name,
			value,
		});

		this.setState({ dropdownDisplayed: false });
	};

	private getValue = () => {
		if (this.props.value === undefined) {
			return this.props.placeholder || Translator.get('SELECT_DEFAULT_TEXT');
		}

		if (!this.props.options) {
			return this.props.value;
		}

		const valueFound = this.props.options.find((e) => e.key === this.props.value);

		if (!valueFound) {
			return this.props.value;
		}

		return Translator.get(valueFound.value);
	};

	public render() {
		return (
			<div className={`select ${this.props.className || ''}`}>
				{this.props.label && (
					<label>{`${this.props.label}${this.props.isMandatory ? ' *' : ''}`}</label>
				)}
				<div
					tabIndex={0}
					className={`select-clickable-view ${
						this.state.dropdownDisplayed ? 'with-dropdown' : ''
					} ${this.props.disabled ? 'disabled' : ''}`}
					onBlur={this.onSelectBlur}
					onClick={this.onSelectClick}>
					{this.getValue()}
					<CaretDown />
				</div>
				{this.props.options && this.state.dropdownDisplayed && (
					<div className="select-dropdown">
						{this.props.options.map((e, i) => (
							<Option key={i} value={e.key} onClick={this.onElementClick}>
								{Translator.get(e.value)}
							</Option>
						))}
					</div>
				)}
			</div>
		);
	}
}

interface IOptionProps {
	children?: any;
	value: any;

	onClick(e): void;
}

function Option(props: IOptionProps) {
	return (
		<div className="option" data-value={props.value} onMouseDown={props.onClick}>
			{props.children}
		</div>
	);
}
