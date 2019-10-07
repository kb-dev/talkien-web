import React from 'react';

import logo from 'assets/LogoTalkien.svg';
import Input from 'atoms/Input';
import LeafletMap from 'atoms/LeafletMap';

import './FormTwo.scss';
import LeftBar from 'components/LeftBar';

class FormOne extends React.Component<any> {
	public render() {
		return (
			<div className="talk-container">
				<LeftBar />
				<object data={logo} className="logo-talkien" />
				<div className="right-block">
					<div className="block-talk">
						<Input
							name="talk-name"
							label="Nom du talk"
							className="input-talk-name"
							type="text"
							required={true}
						/>

						<Input
							name="event-name"
							label="Événement du talk *"
							className="input-event-name"
							type="text"
							required={true}
						/>

						<div className="dated-and-place">
							<div className="from">Du</div>
							<div className="begin">
								<Input
									name="begin-dated"
									label="Debut du talk*"
									className="input-begin-dated"
									type="text"
									required={true}
								/>
							</div>
							<div className="to">au</div>
							<div className="end">
								<Input
									name="end-dated"
									label="Fin du talk*"
									className="input-end-dated"
									type="text"
									required={true}
								/>
							</div>
							<div className="in">à</div>
							<div className="places">
								<Input
									name="places-name"
									label="Nom du lieu où est organisé le talk*"
									className="input-places-name"
									type="text"
									required={true}
								/>
							</div>
						</div>
						<div className="description">
							<Input
								name="long-descriptions"
								label="Description complète *"
								className="input-long-descriptions"
								type="text"
								required={true}
							/>
						</div>
						<div className="category">
							<div className="categories">
								<Input
									name="categories-to-find-the-talks"
									label="Catégories pour retrouver le talk"
									className="input-category"
									type="text"
									required={false}
								/>
							</div>
							<div className="categories-topics"/>
						</div>
						<div className="language-block">
							<Input
								name="language"
								label="Langue"
								className="input-language"
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
										type="text"
										required={false}
									/>
								</div>
								<div className="name-user-speaker">
									<Input
										name="name-user"
										label="Nom d’utilisateur Twitter du speaker·ine"
										className="input-name-user"
										type="text"
										required={false}
									/>
								</div>
								<div className="website-speaker">
									<Input
										name="website-speaker"
										label="Site web du speaker·ine"
										className="input-website-speaker"
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
									<div className="preview-picture"/>
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
										type="text"
										required={true}
									/>
								</div>
								<div className="job-speaker">
									<Input
										name="job"
										label="Poste du speaker·ine dans l’entreprise"
										className="input-job"
										type="text"
										required={false}
									/>
								</div>
								<div className="website-company">
									<Input
										name="website"
										label="Site de l’entreprise"
										className="input-website"
										type="text"
										required={false}
									/>
								</div>
								<div className="logo-url">
									<Input
										name="url-logo-absolute"
										label="URL absolue du logo de l'entreprise"
										className="input-logo-url"
										type="text"
										required={false}
									/>
								</div>
							</div>
							<div className="preview-logo-block">
								<div className="preview-logo-text">Preview du logo</div>
								<div className="zone-of-preview">
									<div className="preview-logo"/>
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

export default FormOne;
