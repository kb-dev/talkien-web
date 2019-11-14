import React from 'react';

import logo from 'assets/LogoTalkien.svg';
import Form from 'atoms/Forms';
import Input from 'atoms/Input';
import TextArea from 'atoms/TextArea';
import { Event } from 'tools/types';
import { randomColor } from 'tools/color';

import './FormTwo.scss';
import LeftBar from 'components/LeftBar';

class FormTwo extends Form<any> {
	constructor(props: any) {
		super(props);
	}

	private onTopicsCategoryChanged = (e) => {
		if (e.value === 13) {
			const newTopicCategory = [
				...this.state.formData.topicsCategory,
				this.state.formData.currentTopicCategory,
			];
			this.onMultipleValuesChanged({
				topicsCategory: newTopicCategory,
				currentTopicCategory: '',
			});
		}
	};

	private onTopicsCategoryDelete = (e) => {
		const array = [...this.state.formData.topicsCategory];
		const index = parseInt(e.currentTarget.dataset.id, 16);
		array.splice(index, 1);
		this.onValueChanged({
			name: 'topicsCategory',
			value: array,
		});
	};

	public getInitialState() {
		return {
			formData: {
				topicsCategory: [],
				currentTopicCategory: '',
				nameUser : "@",
				websiteSpeaker:"https://",
				urllogoabsolute:"https://",
			},
		};
	}
	public render() {
		console.log(this.state.formData);
		return (
			<div className="talk-container">
				<LeftBar />
				<object data={logo} className="logo-talkien" />
				<div className="right-block">
					<div className="block-talk">
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
									className="input-startDate"
									value={this.state.formData.startDate}
									onChange={this.onValueChanged}
									type="text"
									required={true}
								/>
							</div>
							<div className="end">
								<div className="to">au</div>

								<Input
									name="endDate"
									label="Fin du talk *"
									className="input-endDate"
									value={this.state.formData.endDate}
									onChange={this.onValueChanged}
									type="text"
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
								className="textarea-long-descriptions"
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
									{this.state.formData.topicsCategory.map(
										(newTopicCategory, i) => (
											<div
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
												<p className="topics-add-new-text">
													{newTopicCategory}
												</p>
											</div>
										),
									)}
								</div>
							</div>
						</div>
						<div className="language-block">
							<Input
								name="language"
								label="Langue"
								className="input-language"
								value={this.state.formData.language}
								onChange={this.onValueChanged}
								type="text"
								required={false}
							/>
						</div>
						<div className="speaker">
							<div className="speaker-block">
								<div className="identity-speaker">
									<Input
										name="identity"
										label="Nom et prénom du speaker·ine *"
										className="input-identity"
										value={this.state.formData.identity}
										onChange={this.onValueChanged}
										type="text"
										required={false}
									/>
								</div>
								<div className="name-user-speaker">
									<Input
										name="nameUser"
										label="Nom d’utilisateur Twitter du speaker·ine"
										className="input-name-user"
										value={this.state.formData.nameUser}
										onChange={this.onValueChanged}
										type="text"
										required={false}
									/>
								</div>
								<div className="website-speaker">
									<Input
										name="websiteSpeaker"
										label="Site web du speaker·ine"
										className="input-website-speaker"
										value={this.state.formData.websiteSpeaker}
										onChange={this.onValueChanged}
										type="text"
										required={false}
									/>
								</div>
							</div>
							<div className="preview-picture-speaker-block">
								<div className="preview-picture-text">
									Preview de l’image du speaker
								</div>
								<div className="zone-of-preview-picture">
									<div className="preview-speaker-container">
										<img
											src={this.state.formData.websiteSpeaker}
											className="preview-speaker"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="logo">
							<div className="news">
								<div className="company-speaker">
									<Input
										name="company"
										label="Nom de l’entreprise du speaker·ine *"
										className="input-company"
										value={this.state.formData.company}
										onChange={this.onValueChanged}
										type="text"
										required={true}
									/>
								</div>
								<div className="job-speaker">
									<Input
										name="job"
										label="Poste du speaker·ine dans l’entreprise"
										className="input-job"
										value={this.state.formData.job}
										onChange={this.onValueChanged}
										type="text"
										required={false}
									/>
								</div>
								<div className="website-company">
									<Input
										name="website"
										label="Site de l’entreprise"
										className="input-website"
										value={this.state.formData.website}
										onChange={this.onValueChanged}
										type="text"
										required={false}
									/>
								</div>
								<div className="logo-url">
									<Input
										name="urllogoabsolute"
										label="URL absolue du logo de l'entreprise"
										className="input-logo-url"
										value={this.state.formData.urllogoabsolute}
										onChange={this.onValueChanged}
										type="text"
										required={false}
									/>
								</div>
							</div>
							<div className="preview-logo-block">
								<div className="preview-logo-text">Preview du logo</div>
								<div className="zone-of-preview">
									<img
										src={this.state.formData.urllogoabsolute}
										className="preview-logo"
									/>
								</div>
							</div>
						</div>
						<div className="button-add">
							<div className="add-speaker-button">
								<div className="add-speaker">Ajouter un·e speaker·ine</div>
							</div>
						</div>
						<div className="button-talk">
							<div className="left-button">
								<div className="save-talk">Sauvegarder le talk</div>
							</div>
							<div className="right-button">
								<div className="submit-talk">Soumettre le talk</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormTwo;
