import React from 'react';

import Form from 'atoms/Forms';
import Input from 'atoms/Input';

import './SpeakerBlock.scss';

class SpeakerBlock extends Form<any> {
	public getInitialState() {
		return {
			formData: {
				logoSpeaker: 'https://',
				nameUser: '@',
				urlLogoAbsolute: 'https://',
				websiteSpeaker: 'https://',
			},
		};
	}
	public render() {
		return this.getForm(
			<>
				<div className="speaker-add">
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
									required={true}
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
							<div className="logo-speaker">
								<Input
									name="logoSpeaker"
									label="URL absolue du logo du speaker·ine"
									className="input-logo-speaker"
									value={this.state.formData.logoSpeaker}
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
								<div
									style={{
										backgroundImage: `url(${this.state.formData.logoSpeaker})`,
									}}
									className="preview-speaker"
								/>
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
									name="urlLogoAbsolute"
									label="URL absolue du logo de l'entreprise"
									className="input-logo-url"
									value={this.state.formData.urlLogoAbsolute}
									onChange={this.onValueChanged}
									type="text"
									required={false}
								/>
							</div>
						</div>
						<div className="preview-logo-block">
							<div className="preview-logo-text">Preview du logo</div>
							<div className="zone-of-preview">
								<div
									className="preview-logo"
									style={{
										backgroundImage: `url(${this.state.formData.urlLogoAbsolute})`,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</>,
		);
	}
}

export default SpeakerBlock;
