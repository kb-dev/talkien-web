/* eslint-disable max-classes-per-file */

import React, { CSSProperties, Component } from 'react';

import { Event } from 'tools/types';

import Duplicate from './Duplicate';

import './form.scss';

const MARGIN_ON_SCROLL_BETWEEN_ERROR_AND_TOP = 100;

interface IFormProps<P> {
	data?: P;
	scrollContainerSelector?: string;
	onChange?(e: Event<Partial<P> | any>): void;
	onSubmit?(e: Event<Partial<P>>): void;
}

type ValidatorFunction = (value: any) => boolean;

type Validator = {
	fn: ValidatorFunction;
	message: string;
};

type State<P extends object> = {
	duplicates?: any;
	errors: { [name: string]: string | null | Array<string | null> };
	formData: Partial<P>;
	validators: { [key: string]: Array<Validator> };
};

type EventOptions = {
	/**
	 * True to set all values with the same id in current collection to false.
	 */
	invalidateOthers?: boolean;
};

type DuplicateArgs = {
	/**
	 * Content of add button
	 */
	addButton?: string | JSX.Element;
	/**
	 * Default values of any new Duplicate element.
	 */
	defaultValues: unknown;
	/**
	 * Content of delete buttons
	 */
	deleteButton?: string | JSX.Element;
	/**
	 * Id used for storing Duplicate data in formData.
	 */
	id: string;
	/**
	 * View to duplicate.
	 */
	view: React.ComponentClass | ((props: any) => JSX.Element);
	/**
	 * false to remove default add buttons.
	 */
	withAddButtons?: boolean;
	/**
	 * false to remove default remove buttons.
	 */
	withDeleteButtons?: boolean;
	/**
	 * true to pass onDelete function to duplicated view.
	 */
	withOnDelete?: boolean;
};

const ErrorContext = React.createContext({
	errors: {},
});

function getElementFromComplexKey(data, key: string, fn: (elem, index) => any): any {
	if (key && key.indexOf('.') !== -1) {
		const keysArray = key.split('.');
		let dataToChange = data;
		const l = keysArray.length;
		let i = 0;

		for (i; i < l - 1; i++) {
			if (!dataToChange[keysArray[i]]) {
				dataToChange[keysArray[i]] = {};
			}
			dataToChange = dataToChange[keysArray[i]];
		}

		return fn(dataToChange, keysArray[l - 1]);
	} else if (key) {
		return fn(data, key);
	}

	return data;
}

/**
 * Provides a base class to create a form.
 * Must be extended by your custom form component.
 *
 * The render function of your component must call this.getForm().
 *
 * ### Duplication API
 *
 * To create a Duplicate element, you need to call the createDuplicateRenderFunction() function.
 *
 * You can get the function to add an element to the Duplicate with
 *  getAddElementFunctionForDuplicate().
 *
 * If you need a Duplicate in your Duplicate, check Duplicator.
 *
 * ### Validation API
 *
 * All validation API works with key. You need to have the same id or key with inputs,
 *  validators and errors components.
 *
 * To add a new validator, you need to call the addValidator() function **in constructor**.
 *
 * To display an error, use a ErrorDisplay component with `for` set to the same key than input.
 *
 * If you want a base validation to display all errors before component mount, call
 *  validateAll() function **in constructor**.
 */
export default class GenericForm<
	FormDataType extends object = {},
	ExtendedProps extends object = {}
> extends Component<IFormProps<FormDataType> & ExtendedProps, State<FormDataType>> {
	static getEmptyValueFor(data) {
		switch (typeof data) {
			case 'number':
				return 0;
			case 'boolean':
				return true;
			default:
				return '';
		}
	}

	private _isMounted: boolean;
	protected form!: HTMLFormElement | null;

	protected constructor(props) {
		super(props);

		this._isMounted = false;

		this.state = {
			duplicates: {},
			errors: {},
			formData: {} as FormDataType,
			validators: {},
			...this.getInitialState(props),
		};
	}

	protected withErrorContext(children) {
		return (
			<ErrorContext.Provider value={{ errors: this.state.errors }}>
				{children}
			</ErrorContext.Provider>
		);
	}

	/**
	 * Returns the initial state of the form.
	 *
	 * You can change all the state, but prefer use it for initializing formData.
	 */
	protected getInitialState(props: FormDataType): Partial<State<Partial<FormDataType>>> {
		throw new Error('GenericForm.getInitialState not implemented');
	}

	/**
	 * Set a new value to a formData variable.
	 *
	 * If you want to create an new atom for form, prefer using event of the form :
	 *  `{ name: string, value: unkown }`
	 *
	 * This function handles simple names (`firstName`, `phoneNumber`) and complex names
	 *  with a dot (`Address.postalCode`, `Contact.firstName`).
	 */
	protected onValueChanged = (event: Event<any>) => {
		const newData = JSON.parse(JSON.stringify(this.state.formData as any));
		const value = event.value;
		const key = event.name;

		getElementFromComplexKey(newData, key, (elem, cbKey) => (elem[cbKey] = value));

		this.setState({ formData: newData }, () => {
			this.validate({ key, value, cb: () => this.notifyChange() });
		});
	};

	/**
	 * Set a set of new values to a formData variable.
	 *
	 * Parameter must be an object with :
	 * - each key of object is a property key (simple or complex) to change in formData.
	 * - each value is the new value of this property key.
	 *
	 * Ex : { 'something.hello': 42, basicProperty: false }
	 *
	 * This function handles simple names (`firstName`, `phoneNumber`) and complex names
	 *  with a dot (`Address.postalCode`, `Contact.firstName`).
	 */
	protected onMultipleValuesChanged = (changesObject: { [key: string]: any }) => {
		const newData = JSON.parse(JSON.stringify(this.state.formData as any));

		Object.keys(changesObject).forEach((key) => {
			const value = changesObject[key];

			getElementFromComplexKey(newData, key, (elem, cbKey) => (elem[cbKey] = value));
		});

		this.setState({ formData: newData }, () => {
			Object.keys(changesObject)
				.reduce(
					(p, key) =>
						p.then(
							() =>
								new Promise<void>((resolve) => {
									this.validate({ key, value: changesObject[key], cb: resolve });
								}),
						),
					Promise.resolve(),
				)
				.then(() => this.notifyChange());
		});
	};

	/**
	 * Handle submit of the form.
	 *
	 * Basically, it checks if data in the form are valid, and notify
	 *  the parent that the form has been submit (with formData).
	 */
	protected onSubmit = (e) => {
		e.preventDefault();

		const treatedData = this.treatFormDataBeforeValidation(this.state.formData);

		if (this.form && this.form.reportValidity()) {
			this.notifySubmit(treatedData);
		}
	};

	/**
	 * Treat form data before data is validated.
	 *
	 * Default behavior : returns form data. Extends it to add a difference
	 *  behavior.
	 */
	protected treatFormDataBeforeValidation = (formData) => formData;

	/**
	 * Return a HTML form component.
	 *
	 * Must be called in any rendering function.
	 */
	protected getForm(children: JSX.Element) {
		return (
			<form className="form-atom" ref={(form) => (this.form = form)} onSubmit={this.onSubmit}>
				<ErrorContext.Provider value={{ errors: this.state.errors }}>
					{children}
				</ErrorContext.Provider>
			</form>
		);
	}

	/**
	 * Notify parent that formData changed.
	 *
	 * Called when the formData has been changed.
	 */
	protected notifyChange = (name?: string) => {
		if (this.props.onChange) {
			this.props.onChange({ value: this.state.formData, name: 'form' });
		}
	};

	/**
	 * Notify parent that form submitted.
	 *
	 * Called when the form has been submitted.
	 */
	protected notifySubmit = (treatedData) => {
		if (this.props.onSubmit) {
			this.props.onSubmit({ value: treatedData, name: 'form' });
		}
	};

	/**
	 * Create a new duplicate.
	 *
	 * **Must be called only in constructor**.
	 *
	 * This is the main way to create a new Duplicate, and **you must use
	 *  this generally for Duplicate component. Duplicator exists for a special case only**.
	 */
	protected createDuplicateRenderFunction = (params: DuplicateArgs) => {
		const {
			addButton,
			defaultValues,
			deleteButton,
			id,
			view,
			withAddButtons = true,
			withDeleteButtons = true,
			withOnDelete = false,
		} = params;

		const addElementFunction = this.createAddDuplicateElementFunction(id);
		const removeElementFunction = this.createRemoveDuplicateElementFunction(id);
		const getValues = this.createGetValuesFunction(id);
		const onDuplicateChange = this.createOnDuplicateChanged(id);

		const duplicateState = {
			add: addElementFunction,
			counter: 1,
			defaultValues,
			get: getValues,
			remove: removeElementFunction,
			update: onDuplicateChange,
		};

		this.state.duplicates[id] = duplicateState;

		getElementFromComplexKey(this.state.formData, id, (elem, index) => {
			if (!elem[index]) {
				elem[index] = [this.createNewValuesForDuplicate(duplicateState)];
			} else {
				elem[index].forEach((e) => {
					e._id = duplicateState.counter;

					duplicateState.counter++;
				});
			}
		});

		return () => (
			<Duplicate
				addButtonContent={addButton}
				addElement={addElementFunction}
				addDisplayed={withAddButtons}
				deleteButtonContent={deleteButton}
				removeDisplayed={withDeleteButtons}
				removeElement={removeElementFunction}
				getValues={getValues}
				onChange={onDuplicateChange}
				withOnDelete={withOnDelete}
				view={view}
				id={id}
			/>
		);
	};

	/**
	 * Get a duplicate add element function.
	 */
	protected getAddElementFunctionForDuplicate = (id: string) => {
		if (this.state.duplicates[id]) {
			return this.state.duplicates[id].add;
		}
	};

	/**
	 * Get a duplicate remove element function.
	 */
	protected getRemoveElementFunctionForDuplicate = (id: string) => {
		if (this.state.duplicates[id]) {
			return this.state.duplicates[id].remove;
		}
	};

	/**
	 * Call all validators of the form.
	 */
	protected validateAll = (cb: () => any) => {
		const { validators } = this.state;
		let { errors } = this.state;

		if (this._isMounted) {
			errors = { ...errors };
		}

		Object.keys(validators).forEach((name) => {
			let i = 0;
			const validatorsForCurrent = validators[name];

			const iMax = validatorsForCurrent.length;

			for (; i < iMax; i++) {
				if (!validatorsForCurrent[i].fn(this.getValueInState(name))) {
					errors[name] = validatorsForCurrent[i].message;
					break;
				}
			}
		});

		if (this._isMounted) {
			this.setState({ errors }, cb);
		} else if (cb) {
			cb();
		}
	};

	private static setItemsOfCollectionToFalse(data, key, exceptIndex?) {
		let i = 0;
		const iMax = data.length;

		for (; i < iMax; i++) {
			if (i === exceptIndex) {
				continue;
			}

			if (key && key.indexOf('.') !== -1) {
				const childNamesArray = key.split('.');
				let dataToChange = data[i];
				const l = childNamesArray.length;
				let j = 0;

				for (j; j < l - 1; j++) {
					if (!dataToChange[childNamesArray[j]]) {
						dataToChange[childNamesArray[j]] = {};
					}
					dataToChange = dataToChange[childNamesArray[j]];
				}

				dataToChange[childNamesArray[l - 1]] = false;
			} else if (key) {
				data[i][key] = false;
			}
		}
	}

	/**
	 * Call all validators of the form.
	 * Can be called from everywhere.
	 *
	 * @deprecated in favor of validateAll
	 */
	private validateForm = (cb: () => void) => {
		const { validators } = this.state;
		const nextErrors = {};

		Object.keys(validators).forEach((name) => {
			let i = 0;
			const validatorsForCurrent = validators[name];

			const iMax = validatorsForCurrent.length;

			for (; i < iMax; i++) {
				if (!validatorsForCurrent[i].fn(this.getValueInState(name))) {
					nextErrors[name] = validatorsForCurrent[i].message;
					break;
				}
			}
		});

		this.setState({ errors: nextErrors }, cb);
	};

	private isValid = () =>
		Object.keys(this.state.errors).reduce((acc, e) => {
			if (acc === false) {
				return false;
			}

			return !this.state.errors[e];
		}, true);

	private createAddDuplicateElementFunction = (name: string) => () => {
		const newDuplicateState = this.state.duplicates[name];
		const newFormData = JSON.parse(JSON.stringify(this.state.formData));

		newDuplicateState.counter++;

		getElementFromComplexKey(newFormData, name, (elem, index) => {
			elem[index].push(this.createNewValuesForDuplicate(newDuplicateState));
		});

		this.setState(
			{
				duplicates: { ...this.state.duplicates, [name]: newDuplicateState },
				formData: newFormData,
			},
			() => this.notifyChange(name),
		);
	};

	private createNewValuesForDuplicate(duplicateState) {
		return {
			...duplicateState.defaultValues,
			_id: duplicateState.counter,
		};
	}

	private createRemoveDuplicateElementFunction = (name: string) => (index: number) => {
		const newFormData = JSON.parse(JSON.stringify(this.state.formData));

		getElementFromComplexKey(newFormData, name, (elem, cbKey) => {
			elem[cbKey].splice(index, 1);
		});

		this.setState({ formData: newFormData }, () => this.notifyChange(name));
	};

	private createGetValuesFunction = (name) => () => {
		const dataToRetrieve = this.state.formData;

		return (
			getElementFromComplexKey(dataToRetrieve, name, (elem, cbKey) => {
				if (elem[cbKey]) {
					return elem[cbKey];
				}
			}) || []
		);
	};

	private createOnDuplicateChanged = (name: string) => (index: number, e: Event<any>) => {
		const childName = e.name;
		const data = e.value;
		const newFormData = JSON.parse(JSON.stringify(this.state.formData));
		const newFormDataToChange = getElementFromComplexKey(newFormData, name, (elem, cbKey) => {
			if (childName) {
				getElementFromComplexKey(elem[cbKey][index], childName, (newElem, newCbKey) => {
					newElem[newCbKey] = data;
				});
			} else {
				elem[cbKey][index] = { ...newFormDataToChange[index], ...data };
			}
		});

		if (e.invalidateOthers) {
			GenericForm.setItemsOfCollectionToFalse(newFormData[name], childName, index);
		}

		this.setState({ formData: newFormData }, () =>
			this.validate({
				index,
				key: `${name}.${childName}`,
				value: data,

				cb: () => this.notifyChange(name),
			}),
		);
	};

	private getValueInState(key: string) {
		if (key && key.indexOf('.') !== -1) {
			const keysArray = key.split('.');
			let dataToGet = this.state.formData;
			const l = keysArray.length;
			let i = 0;

			for (; i < l - 1; i++) {
				if (!dataToGet[keysArray[i]]) {
					return null;
				}

				dataToGet = dataToGet[keysArray[i]];
			}

			return dataToGet[keysArray[l - 1]];
		}

		return this.state.formData[key];
	}

	public componentDidMount = () => {
		this._isMounted = true;
	};

	public validate = (params: { key: string; value; index?: number; cb?(): void }) => {
		const { key, value, index, cb } = params;
		const validators = this.state.validators[key];

		if (validators) {
			let currentError: string | null = null;

			let i = 0;
			const iMax = validators.length;

			for (; i < iMax; i++) {
				if (!validators[i].fn(value)) {
					currentError = validators[i].message;
					break;
				}
			}

			if (currentError !== this.state.errors[key]) {
				if (index !== undefined) {
					let nextErrorsForCurrentKey = this.state.errors[key] as Array<string | null>;

					if (!nextErrorsForCurrentKey) {
						nextErrorsForCurrentKey = [];
					}

					nextErrorsForCurrentKey[index] = currentError;

					return this.setState(
						{
							errors: { ...this.state.errors, [key]: nextErrorsForCurrentKey },
						},
						() => {
							if (cb) {
								cb();
							}
						},
					);
				} else {
					return this.setState(
						{ errors: { ...this.state.errors, [key]: currentError } },
						() => {
							if (cb) {
								cb();
							}
						},
					);
				}
			}
		}

		if (cb) {
			cb();
		}
	};

	public setErrorValue = (errors: { [name: string]: string | null | Array<string | null> }) => {
		const newError = { ...this.state.errors };
		for (const key of Object.keys(errors)) {
			newError[key] = errors[key];
		}

		this.setState({ errors: newError });
	};

	/**
	 * Add a new validator to the form.
	 */
	public addValidator(key: string, validator: ValidatorFunction, errorMessage: string) {
		let validators = this.state.validators;

		if (this._isMounted) {
			validators = { ...this.state.validators };
		}

		if (!validators[key]) {
			validators[key] = [];
		}

		validators[key].push({
			fn: validator,
			message: errorMessage,
		});

		if (this._isMounted) {
			this.setState({ validators });
		}
	}

	/**
	 * Remove all validators for a key to the form.
	 */
	public removeValidator(key: string) {
		let { validators, errors } = this.state;

		if (this._isMounted) {
			errors = { ...errors };
			validators = { ...validators };
		}

		validators[key] = [];
		errors[key] = null;

		if (this._isMounted) {
			this.setState({ validators, errors });
		}
	}

	public submit() {
		this.validateAll(() => {
			if (this.form && this.isValid()) {
				this.form.dispatchEvent(new Event('submit'));
			} else {
				setTimeout(() => {
					if (this.props.scrollContainerSelector) {
						const scrollContainer = document.querySelector(this.props
							.scrollContainerSelector as any);

						if (!scrollContainer) {
							return;
						}

						const errorDisplay = document.querySelector('.form-error-display');

						if (!errorDisplay) {
							return;
						}

						const errorY = errorDisplay.getBoundingClientRect().top;
						const containerY = scrollContainer.getBoundingClientRect().top;

						let nextScrollY =
							errorY - containerY - MARGIN_ON_SCROLL_BETWEEN_ERROR_AND_TOP;

						if (nextScrollY < 0) {
							nextScrollY = 0;
						}

						scrollContainer.scrollTo(window.scrollX, nextScrollY);
					}
				});
			}
		});
	}

	public render(): JSX.Element {
		throw new Error(
			'GenericForm has no render method. You need to extend from GenericForm to create a form.',
		);
	}
}

export interface IDuplicatorProps {
	addButton?: string | JSX.Element;
	defaultValues: unknown;
	deleteButton?: string | JSX.Element;
	id: string;
	validators?: { [name: string]: Array<Validator> };
	view: React.ComponentClass | React.FunctionComponent<any>;
	withAddButtons?: boolean;
	withDeleteButtons?: boolean;
	withOnDelete?: boolean;

	onChange(e: Event<any>): void;
}

/**
 * Duplicator is a special form component. It provides a way to create a Duplicate element
 *   in a Duplicate element.
 *
 * It works exactly with the same API than Forms. All needed code is already implemented, so
 *   you must normally use it like any React Class.
 *
 * If you need some validation in your duplicated component, use the `validators` property.
 */
export class Duplicator<P extends object = {}> extends GenericForm<P, IDuplicatorProps> {
	public addElement: () => void;
	public removeElement: () => void;

	private renderDuplicate: () => JSX.Element;

	constructor(props) {
		super(props);

		this.renderDuplicate = this.createDuplicateRenderFunction(props);
		this.addElement = this.getAddElementFunctionForDuplicate(props.id);
		this.removeElement = this.getRemoveElementFunctionForDuplicate(props.id);

		if (props.validators) {
			Object.keys(props.validators).forEach((name) => {
				this.state.validators[name] = props.validators[name];
			});
		}
	}

	public notifyChange = () => {
		// Returns the duplicate data as value
		this.props.onChange({ value: this.state.formData[this.props.id], name: this.props.id });
	};

	public getInitialState() {
		if (this.props.data) {
			return { formData: this.props.data };
		}

		return {};
	}

	public render() {
		return (
			<ErrorContext.Provider value={{ errors: this.state.errors }}>
				{this.renderDuplicate()}
			</ErrorContext.Provider>
		);
	}
}

interface IErrorDisplayProps {
	/**
	 * Key of the associated input
	 */
	for: string;
	/**
	 * Index of the current duplicated element.
	 *
	 * **Must be set if the ErrorDisplay will be used in a Duplicate.**
	 */
	index?: number;
}

/**
 * React Component to display an error in a Form.
 *
 * Must be placed in the getForm() children.
 */
export const ErrorDisplay = (props: IErrorDisplayProps) => (
	<ErrorContext.Consumer>
		{({ errors }) => {
			if (errors[props.for] && Array.isArray(errors[props.for])) {
				if (props.index === undefined) {
					throw new Error(
						'ErrorDisplay needs a index property to be used in a Duplicator',
					);
				} else if (errors[props.for][props.index]) {
					return (
						<div className="form-error-display">{errors[props.for][props.index]}</div>
					);
				}
			} else if (errors[props.for]) {
				return <div className="form-error-display">{errors[props.for]}</div>;
			}
		}}
	</ErrorContext.Consumer>
);

export interface ILine {
	className?: string;
	children?: JSX.Element | Array<JSX.Element>;
	fullWidth?: boolean;
}

/**
 * Simple style component for a form line
 */
export const Line = (props: ILine) => (
	<div
		className={`form-line-container ${props.fullWidth ? 'full-width' : ''} ${props.className ||
			''}`}>
		{props.children}
	</div>
);

export interface IInputContainer {
	className?: string;
	children?: JSX.Element | Array<JSX.Element>;
	fullWidth?: boolean;
	style?: CSSProperties;
}

/**
 * Simple style component for any input.
 */
export const InputContainer = (props: IInputContainer) => (
	<div
		className={`form-input-container ${props.fullWidth ? 'full-width' : ''} ${props.className ||
			''}`}
		style={props.style}>
		{props.children}
	</div>
);

export const Separator = () => <hr />;
