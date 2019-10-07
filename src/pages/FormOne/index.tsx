import React from 'react';

import logo from 'assets/LogoTalkien.svg';
import Input from 'atoms/Input';
import LeafletMap from 'atoms/LeafletMap';

import './FormOne.scss';
import LeftBar from 'components/LeftBar';

class FormOne extends React.Component<any> {
	public render() {
		return (
			<div className="event-container">
				<LeftBar />
				<object data={logo} className="logo-talkien" />
				<div className="right-block">
					<div className="block-event">
						<Input
							name="event-name"
							label="Nom de l'événement"
							className="input-event-name"
							type="text"
							required={true}
						/>
						<div className="dated-and-place">
								<div className="from">Du</div>
							<div className="begin">

								<Input
									name="begin-dated"
									label="Debut de l'événement"
									className="input-begin-dated"
									type="text"
									required={true}
								/>
							</div>
								<div className="to">au</div>
							<div className="end">

								<Input
									name="end-dated"
									label="Fin de l'événement"
									className="input-end-dated"
									type="text"
									required={true}
								/>
							</div>
								<div className="in">à</div>
							<div className="places">

								<Input
									name="places-name"
									label="Nom du lieu où est organisé l'événement*"
									className="input-places-name"
									type="text"
									required={true}
								/>
							</div>
						</div>
						<div className="adress">
							<div className="adress-inputs">
								<Input
									name="full-address-of-the-place"
									label="Adresse complète du lieu*"
									className="input-full-address-of-the-place"
									type="text"
									required={true}
								/>
								<Input
									name="longitude"
									label="Longitude"
									className="input-longitude"
									type="text"
									required={true}
								/>
								<Input
									name="latitude"
									label="Latitude"
									className="input-latitude"
									type="text"
									required={true}
								/>
							</div>
							<LeafletMap />
						</div>
						<div className="description">
							<Input
								name="short-descriptions"
								label="Description courte (100 caractères maximum)*"
								className="input-short-descriptions"
								type="text"
								required={true}
							/>
							<Input
								name="long-descriptions"
								label="Description complète (600 caractères maximum)"
								className="input-long-descriptions"
								type="text"
								required={true}
							/>
						</div>
						<div className="category">
							<div className="categories">
								<Input
									name="categories-to-find-the-events"
									label="Catégories pour retrouver l’événement"
									className="input-category"
									type="text"
									required={true}
								/>
							</div>
							<div className="categories-topics"></div>
						</div>
						<div className="color">
							<div className="color-primary-secondary">
								<div className="color-primary">
									<Input
										name="color-primary-to-event"
										label="Couleur primaire de l'évènement*"
										className="input-color-primary"
										type="text"
										required={true}
									/>
								</div>
								<div className="color-secondary">
									<Input
										name="color-secondary-to-event"
										label="Couleur secondaire de l'évènement*"
										className="input-color-secondary"
										type="text"
										required={true}
									/>
								</div>
							</div>
							<div className="color-gradient">
								<div className="color-gradient-to-event">Dégradé de l’événement</div>
								<div className="gradient" />
							</div>
						</div>
						<div className="logo">
							<div className="url">
								<div className="logo-url">
									<Input
										name="url-logo-absolute"
										label="URL absolue du logo"
										className="input-logo-url"
										type="text"
										required={true}
									/>
								</div>
								<div className="event-url">
									<Input
										name="url-event-absolute"
										label="URL absolue de l’événement"
										className="input-event-url"
										type="text"
										required={true}
									/>
								</div>
								<div className="ticketing-url">
									<Input
										name="ticketing-url"
										label="URL absolue de la billeterie pour l’événement"
										className="input-ticketing-url"
										type="text"
										required={true}
								/>
								</div>
							</div>
							<div className="preview-logo-block">
								<div className="preview-logo-text">Preview du logo</div>
								<div className="zone-of-preview">
									<div className="preview-logo"></div>
								</div>
							</div>
						</div>

						<div className="button-event">
							<div className="left-button">
								<div className="save-event">Sauvegarder l’événement</div>
							</div>
							<div className="right-button">
								<div className="submit-event">Soumettre l’événement</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormOne;
