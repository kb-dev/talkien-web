'use strict';

import React, { Component, ReactChild } from 'react';

import { Event } from 'tools/types';

import './button.scss';

export interface Props {
	className?: string;
	enabled?: boolean;
	errorMessage?: string;
	loading?: boolean;
	noCenterContainer?: boolean;
	style?: any;
	successMessage?: string;
	tabIndex?: number;
	type?: 'button' | 'submit' | 'reset';
	value?: string | number;

	onBlur?(): void;
	onClick?(e: Event): void;
	onMouseDown?(): void;
}

type State = {
	clearError?: number | null;
	clearSuccess?: number | null;
	error?: boolean | null;
	success?: boolean | null;
	errorMessage?: string | null;
	successMessage?: string | null;
};

const MESSAGE_DISPLAY_TIME = 3000;

export default class Button extends Component<Props, State> {
	private button: HTMLButtonElement | null = null;

	constructor(props: Props) {
		super(props);

		this.state = {
			error: !!props.errorMessage,
			errorMessage: props.errorMessage,
			success: !!props.successMessage,
			successMessage: props.successMessage,
		};

		this.onClick = this.onClick.bind(this);
	}

	private static getErrorMessageState(message: string) {
		return {
			error: true,
			errorMessage: message,
			success: false,
		};
	}

	private static getSuccessMessageState(message: string) {
		return {
			error: false,
			success: true,
			successMessage: message,
		};
	}

	private getMessage() {
		const { children } = this.props;
		const { error, success, errorMessage, successMessage } = this.state;

		let messageDiv;

		if (success) {
			messageDiv = <div className="success-message">{successMessage}</div>;
		} else if (error) {
			messageDiv = <div className="error-message">{errorMessage}</div>;
		}

		return <div>{messageDiv || <div className="message">{children}</div>}</div>;
	}

	public componentDidUpdate() {
		const { error, success, clearError, clearSuccess } = this.state;

		if (success) {
			if (!clearSuccess) {
				this.setState({
					clearSuccess: window.setTimeout(
						() =>
							this.setState({
								clearSuccess: null,
								success: false,
							}),
						MESSAGE_DISPLAY_TIME,
					),
				});
			}
		} else if (error) {
			if (!clearError) {
				this.setState({
					clearError: window.setTimeout(
						() => this.setState({ error: false, clearError: null }),
						MESSAGE_DISPLAY_TIME,
					),
				});
			}
		}
	}

	public static getDerivedStateFromProps(nextProps, prevState) {
		let newState: State = {};

		if (nextProps.errorMessage !== prevState.errorMessage) {
			newState = {
				...newState,
				...Button.getErrorMessageState(nextProps.errorMessage),
			};
		}

		if (nextProps.successMessage !== prevState.successMessage) {
			newState = {
				...newState,
				...Button.getSuccessMessageState(nextProps.successMessage),
			};
		}

		return newState;
	}

	public componentWillUnmount() {
		const { clearError, clearSuccess } = this.state;

		if (clearError) {
			window.clearTimeout(clearError);
		}

		if (clearSuccess) {
			window.clearTimeout(clearSuccess);
		}
	}

	public focus = () => {
		if (this.button) {
			this.button.focus();
		}
	};

	public onClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const { onClick, enabled } = this.props;

		if (!onClick || enabled === false) {
			return;
		}

		onClick({
			name: 'button',
			value: e.currentTarget.dataset.value || '',
		});
	};

	public onMouseDown = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const { onMouseDown, enabled } = this.props;

		if (!onMouseDown || enabled === false) {
			return;
		}

		onMouseDown();
	};

	public render() {
		const {
			loading,
			style,
			errorMessage,
			noCenterContainer,
			className,
			children,
			enabled,
			type,
			value,
			onBlur,
		} = this.props;

		const { error, success } = this.state;

		let classes = `${className || ''}`;

		if (loading) {
			classes += ' loading';
		} else if (success) {
			classes += ' success';
		} else if (error) {
			classes += ' error';
		}

		if (enabled === false) {
			classes += ' disabled';
		}

		return (
			<button
				ref={(button) => (this.button = button)}
				type={type}
				className={classes}
				style={style}
				onClick={this.onClick}
				onBlur={onBlur}
				onMouseDown={this.onMouseDown}
				data-value={value}>
				<div className={noCenterContainer ? 'full-width' : 'v-center-container'}>
					{!loading && this.getMessage()}
					{loading && (
						<div className={noCenterContainer ? 'full-width' : 'h-center-container'}>
							<div className="dot" />
							<div className="dot" />
							<div className="dot" />
						</div>
					)}
				</div>
			</button>
		);
	}
}
