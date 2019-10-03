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
				<object data={logo} className="logo-Talkien" />
				<div className="right-block">
					<div className="block-event">
						<Input
							name="eventName"
							label="Nom de l'événement"
							className="input-event-name"
							type="text"
							required={true}
						/>
						<div className="datedAndPlace">
							<div className="begin">
								<div className="from">Du</div>

								<Input
									name="begin-dated"
									label="Debut de l'événement"
									className="input-begin-dated"
									type="text"
									required={true}
								/>
							</div>
							<div className="end">
								<div className="to">au</div>

								<Input
									name="end-dated"
									label="Fin de l'événement"
									className="input-end-dated"
									type="text"
									required={true}
								/>
							</div>
							<div className="places">
								<div className="in">à</div>

								<Input
									name="places-name"
									label="Nom du lieu où est organisé l'événement*"
									className="input-places-name"
									type="text"
									required={true}
								/>
							</div>
						</div>
						<div className="Adress">
							<div className="adress-inputs">
								<Input
									name="fullAddressOfThePlace"
									label="Adresse complète du lieu*"
									className="input-fullAddressOfThePlace"
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
						<div className="Category">
							<div className="Categories">
								<Input
									name="Categories-ToFindTheEvents"
									label="Catégories pour retrouver l’événement"
									className="input-Category"
									type="text"
									required={true}
								/>
							</div>
							<div className="Categories-topics"></div>
						</div>
						<div className="Color">
							<div className="Color-Primary-Secondary">
								<div className="Color-Primary">
									<Input
										name="Color-PrimaryToEvent"
										label="Couleur primaire de l'évènement*"
										className="input-ColorPrimary"
										type="text"
										required={true}
									/>
								</div>
								<div className="Color-Secondary">
									<Input
										name="Color-SecondaryToEvent"
										label="Couleur secondaire de l'évènement*"
										className="input-ColorSecondary"
										type="text"
										required={true}
									/>
								</div>
							</div>
							<div className="Color-Gradient">
								<div className="Color-GradientToEvent">Dégradé de l’événement</div>
								<div className="Gradient" />
							</div>
						</div>
						<div className="logo">
							<div className="URL">
								<div className="logo-URL">
									<Input
										name="URL-logoAbsolute"
										label="URL absolue du logo"
										className="input-logoURL"
										type="text"
										required={true}
									/>
								</div>
								<div className="event-URL">
									<Input
										name="URL-eventAbsolute"
										label="URL absolue de l’événement"
										className="input-eventURL"
										type="text"
										required={true}
									/>
								</div>
								<div className="ticketing-URL">
									<Input
										name="ticketing-URL"
										label="URL absolue de la billeterie pour l’événement"
										className="input-ticketingURL"
										type="text"
										required={true}
									/>
								</div>
							</div>
							<div className="Preview-logo-block">
								<div className="preview-logo-text">Preview du logo</div>
								<div className="zoneOfPreview">
									<div className="Preview-logo"></div>
								</div>
							</div>
						</div>

						<div className="Button-Event">
							<div className="Left-Button">
								<div className="Save-Event">Sauvegarder l’événement</div>
							</div>
							<div className="Right-Button">
								<div className="Submit-Event">Soumettre l’événement</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormOne;
