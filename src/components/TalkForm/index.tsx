import React from 'react';

import Button from 'atoms/Button';
import Form from 'atoms/Forms';
import Input from 'atoms/Input';
import Select from 'atoms/Select';
import TextArea from 'atoms/TextArea';
import SpeakerBlock from 'components/SpeakerBlock';
import { randomColor } from 'tools/color';

import './TalkForm.scss';
import { prependOnceListener } from 'cluster';

const ENTER_KEY = 13;

const speakerBlock = (props) => {
	let button = <div />;
	if (props.onDelete) {
		button = (
			<Button onClick={props.onDelete} className="button-remove">
				Remove
			</Button>
		);
	}
	return (
		<div style={{ color: 'white' }}>
			<SpeakerBlock />
			{button}
		</div>
	);
};

class TalkForm extends Form<any> {
	private duplicateRender: any;
	private createSpeakerBlock: any;

	constructor(props: any) {
		super(props);

		this.duplicateRender = this.createDuplicateRenderFunction({
			defaultValues: {},
			id: 'speakers',
			view: speakerBlock,
			withAddButtons: false,
			withDeleteButtons: false,
			withOnDelete: true,
		});

		this.createSpeakerBlock = this.getAddElementFunctionForDuplicate('speakers');
	}

	private onTopicsCategoryChanged = (e) => {
		if (e.value === ENTER_KEY) {
			const newTopicCategory = [
				...this.state.formData.topicsCategory,
				this.state.formData.currentTopicCategory,
			];
			this.onMultipleValuesChanged({
				currentTopicCategory: '',
				topicsCategory: newTopicCategory,
			});
		}
	};

	private onTopicsCategoryDelete = (e) => {
		const array = [...this.state.formData.topicsCategory];
		const index = parseInt(e.currentTarget.dataset.id, 2);
		array.splice(index, 1);
		this.onValueChanged({
			name: 'topicsCategory',
			value: array,
		});
	};

	public getInitialState() {
		return {
			formData: {
				currentTopicCategory: '',
				logoSpeaker: 'https://',
				nameUser: '@',
				topicsCategory: [],
				urlLogoAbsolute: 'https://',
				websiteSpeaker: 'https://',
			},
		};
	}
	public render() {
		return this.getForm(
			<>
				<Input
					name="talkName"
					label="Nom du talk *"
					className="input-talk-name"
					value={this.state.formData.talkName}
					onChange={this.onValueChanged}
					type="text"
					required={true}
				/>

				<Input
					name="eventName"
					label="Événement du talk *"
					className="input-event-name"
					value={this.state.formData.eventName}
					onChange={this.onValueChanged}
					type="text"
					required={true}
				/>

				<div className="date-and-place">
					<div className="start">
						<div className="from">Du</div>

						<Input
							name="startDate"
							label="Debut du talk *"
							className="input-start-date"
							value={this.state.formData.startDate}
							onChange={this.onValueChanged}
							type="datetime-local"
							required={true}
						/>
					</div>
					<div className="end">
						<div className="to">au</div>

						<Input
							name="endDate"
							label="Fin du talk *"
							className="input-end-date"
							value={this.state.formData.endDate}
							onChange={this.onValueChanged}
							type="datetime-local"
							required={true}
						/>
					</div>
					<div className="places">
						<div className="in">à</div>

						<Input
							name="address"
							label="Lieu du talk *"
							className="input-address"
							value={this.state.formData.address}
							onChange={this.onValueChanged}
							type="text"
							required={true}
						/>
					</div>
				</div>
				<div className="description">
					<TextArea
						name="longDescription"
						label="Description complète *"
						className="textarea-long-description"
						value={this.state.formData.longDescription}
						onChange={this.onValueChanged}
					/>
				</div>
				<div className="category">
					<div className="categories">
						<Input
							name="currentTopicCategory"
							label="Catégories pour retrouver le talk"
							className="input-category"
							value={this.state.formData.currentTopicCategory}
							onChange={this.onValueChanged}
							onKeyDown={this.onTopicsCategoryChanged}
							type="text"
							required={false}
						/>
					</div>
					<div className="categories-topics">
						<div className="topics-add">
							{this.state.formData.topicsCategory.map((newTopicCategory, i) => (
								<div
									key={i}
									className="topics-add-new"
									style={{
										backgroundColor: randomColor(newTopicCategory),
									}}>
									<div
										className="delete-block"
										data-id={i}
										onClick={this.onTopicsCategoryDelete}>
										<div className="cross" />
									</div>
									<p className="topics-add-new-text">{newTopicCategory}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="language-block">
					<Select
						name="language"
						label="Langue"
						className="select-language"
						value={this.state.formData.language}
						onChange={this.onValueChanged}
						placeholder="Selectionner la langue"
						options={[
							{ key: 'Anglais', value: 'Anglais' },
							{ key: 'Espagnol', value: 'Espagnol' },
							{ key: 'Français', value: 'Français' },
						]}
					/>
				</div>
				{this.duplicateRender()}
				<div className="button-add">
					<div className="add-speaker-button">
						<Button className="add-speaker" onClick={this.createSpeakerBlock}>
							Ajouter un·e speaker·ine
						</Button>
					</div>
				</div>
				<div className="buttons-container">
					<div className="left-button">
						<Button className="save-talk">Sauvegarder le talk</Button>
					</div>
					<div className="right-button">
						<Button className="submit-talk">Soumettre le talk</Button>
					</div>
				</div>
			</>,
		);
	}
}

export default TalkForm;
