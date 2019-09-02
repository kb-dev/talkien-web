'use strict';

import React, { CSSProperties, Component } from 'react';

import './input.scss';

export interface IInputProps {
	autoComplete?: string; // HTML5 Property
	autoCompleteList?: boolean;
	autoFocus?: boolean;
	bottomLabel?: string;
	checked?: boolean;
	className?: string;
	containerStyle?: CSSProperties;
	controlled?: boolean;
	debounce?: number;
	disabled?: boolean;
	focus?: boolean;
	forceValue?: boolean;
	icon?: React.FunctionComponent<any>;
	id?: string;
	isMandatory?: boolean;
	label?: string;
	max?: number;
	maxLength?: number;
	min?: number;
	minLength?: number;
	name: string;
	pattern?: string;
	placeholder?: string;
	readOnly?: boolean;
	required?: boolean;
	secondLabel?: string;
	size?: number;
	step?: number;
	style?: CSSProperties;
	tabIndex?: number;
	type: string;
	value?: string | number;

	onBlur?(): void;
	onChange?(e: Talkien.Event): void;
	onFocus?(): void;
	onInput?(): void;
	onInputClick?(): void;
	onKeyDown?(e: Talkien.Event<number>): void;
	onKeyPress?(e: Talkien.Event<number>): void;
	onClick?(value: string | number): void;
}

type State = {
	isEmpty: boolean;
	currentDebounceTimeout?: any;
	value: string | number;
};

function focusInput(e) {
	e.target.previousSibling.focus();
}

export default class Input extends Component<IInputProps, State> {
	private inputElement: HTMLInputElement | null = null;

	constructor(props) {
		super(props);

		this.state = {
			isEmpty: props.type !== 'number',
			value: this.getInitValue(),
		};

		this.focus = this.focus.bind(this);
	}

	private getInitValue() {
		const { value, type } = this.props;
		if (type) {
			if (type === 'number') {
				return value || 0;
			}
		}

		return value || '';
	}

	private onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
		const { debounce, onChange } = this.props;
		const nextState: any = {};

		if (e.currentTarget.value.length && this.state.isEmpty) {
			nextState.isEmpty = false;
		} else if (!e.currentTarget.value.length && !this.state.isEmpty) {
			nextState.isEmpty = true;
		}

		if (this.props.type === 'number') {
			nextState.value = parseFloat(e.currentTarget.value.replace(/,/, '.') || '0');
		} else {
			nextState.value = e.currentTarget.value;
		}

		if (this.state.currentDebounceTimeout) {
			clearTimeout(this.state.currentDebounceTimeout);
		}

		if (debounce && onChange) {
			nextState.currentDebounceTimeout = setTimeout(
				() =>
					onChange({
						name: this.props.name,
						value: nextState.value,
					}),
				this.props.debounce,
			);
		}

		this.setState(nextState, () => {
			if (!debounce && onChange) {
				onChange({
					name: this.props.name,
					value: nextState.value,
				});
			}
		});
	};

	private onClick = (e) => {
		e.preventDefault();

		if (this.props.onClick) {
			this.props.onClick(this.state.value);
		}
	};

	private onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const key = e.keyCode || e.charCode;

		if (this.props.onKeyDown) {
			this.props.onKeyDown({
				name: this.props.name,
				value: key,
			});
		}
	};

	private onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const key = e.keyCode || e.charCode;

		if (this.props.onKeyPress) {
			this.props.onKeyPress({
				name: this.props.name,
				value: key,
			});
		}
	};

	public getWidth() {
		if (this.inputElement) {
			return this.inputElement.getBoundingClientRect().width;
		}

		return 0;
	}

	public getInput() {
		if (this.inputElement) {
			return this.inputElement;
		}

		return null;
	}

	public getValue() {
		if (this.inputElement) {
			return this.inputElement.value;
		}

		return null;
	}

	public clear() {
		this.setState({
			isEmpty: true,
			value: this.getInitValue(),
		});
	}

	public componentDidMount() {
		const { value } = this.props;

		if (value) {
			if (typeof value === 'number') {
				this.setState({ isEmpty: false });
			} else if (value.length > 0) {
				this.setState({ isEmpty: false });
			}
		}

		if (this.props.focus && this.inputElement) {
			this.inputElement.focus();
		}
	}

	public focus() {
		if (this.inputElement) {
			this.inputElement.focus();
		}
	}

	public componentDidUpdate(prevProps, prevState) {
		const { value } = this.props;
		if (
			(value || value === 0) &&
			prevProps.value !== value &&
			(typeof value === 'number' || value.length > 0)
		) {
			this.setState({ value, isEmpty: false });
		}
	}

	public render() {
		const {
			onChange,
			onKeyDown,
			onKeyPress,
			onClick,
			onInputClick,
			containerStyle,
			placeholder,
			label,
			isMandatory,
			icon,
			focus,
			forceValue,
			className,
			autoCompleteList,
			controlled,
			debounce,
			secondLabel,
			bottomLabel,
			...attributes
		} = this.props;

		let inputClassName = '';
		let { isEmpty } = this.state;
		let nameDiv;
		let placeholderDiv;

		if (label) {
			inputClassName = 'with-label';

			nameDiv = (
				<label onClick={this.focus} htmlFor={this.props.name}>
					{`${label}${isMandatory ? ' *' : ''}`}
				</label>
			);
		}

		const newAttributes = { ...attributes };

		if (!controlled) {
			newAttributes.value = this.state.value;
		} else {
			isEmpty = !this.props.value;
		}

		if (placeholder && isEmpty) {
			placeholderDiv = (
				<span
					className={`placeholder v-center-container ${icon ? 'with-icon' : ''} ${
						label ? 'with-label' : ''
					}`}
					onClick={this.focus}>
					{placeholder}
				</span>
			);

			inputClassName += ' with-placeholder';
		}

		if (autoCompleteList) {
			inputClassName += ' with-autocomplete';
		}

		let iconClass = 'input-icon';

		if (onClick) {
			iconClass += ' clickable';
		}

		return (
			<div
				className={`input-component ${className || ''} ${isEmpty ? '' : 'not-empty'}`}
				style={containerStyle}>
				{label && nameDiv}
				{secondLabel && <div className="second-label">{secondLabel}</div>}
				<div className="input-container" onClick={this.props.onInputClick}>
					{icon && (
						<div className="input-icon" onClick={this.onClick}>
							{React.createElement(icon, { className: 'input-icon-internal' })}
						</div>
					)}
					<input
						className={inputClassName}
						onChange={this.onChange}
						onKeyDown={this.onKeyDown}
						onKeyPress={this.onKeyPress}
						ref={(input) => (this.inputElement = input)}
						id={this.props.name}
						value={this.state.value}
						autoComplete="off"
						{...newAttributes}
					/>
					{placeholder && placeholderDiv}
				</div>
				{bottomLabel && <div className="bottom-label">{bottomLabel}</div>}
			</div>
		);
	}
}
