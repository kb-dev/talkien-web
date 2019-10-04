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
							<div className="from">Du</div>
							<div className="block-begin-dated">
								<div className="begin-dated">Debut de l'événement*</div>
								<input
									className="input-begin-dated"
									required
									placeholder="04/06/2020 8h00"></input>
							</div>
							<div className="to">Au</div>
							<div className="block-end-dated">
								<div className="end-dated">Fin de l'événement*</div>
								<input
									className="input-end-dated"
									required
									placeholder="05/06/2020 18h30"></input>
							</div>
							<div className="in">à</div>
							<div className="block-places-name">
								<div className="places-name">
									Nom du lieu où est organisé l'événement*
								</div>
								<input
									className="input-places-name"
									required
									placeholder="Parc des expositions"></input>
							</div>
						</div>
						<div className="Adress">
							<div className="adress-inputs">
								<div className="fullAddressOfThePlace">
									Adresse complète du lieu*
								</div>
								<input
									className="input-fullAddressOfThePlace"
									required
									placeholder="4 Privet Drive, Little Whinging, Surrey"></input>
								<div className="longitude">Longitude</div>
								<input className="input-longitude" placeholder="-0.1277583"></input>
								<div className="latitude">Latitude</div>
								<input className="input-latitude" placeholder="51.5073509"></input>
							</div>
							<LeafletMap />
						</div>
						<div className="Description">
							<div className="short-descriptions">
								Description courte (100 caractères maximum)*
							</div>
							<input className="input-short-descriptions" required />
							<div className="long-descriptions">
								Description complète (600 caractères maximum)
							</div>
							<input className="input-long-descriptions" />
						</div>
						<div className="Category">
							<div className="Categories">
								<div className="Categories-ToFindTheEvents">
									Catégories pour retrouver l’événement
								</div>
								<input className="input-Category" />
							</div>
							<div className="Categories-topics"></div>
						</div>
						<div className="Color">
							<div className="Color-Primary">
								<div className="Color-PrimaryToEvent">
									Couleur primaire de l'évènement*
								</div>
								<input
									className="input-ColorPrimary"
									placeholder="#C7CC18"
									required
								/>
							</div>
							<div className="Color-Secondary">
								<div className="Color-SecondaryToEvent">
									Couleur secondaire de l'évènement*
								</div>
								<input
									className="input-ColorSecondary"
									placeholder="#E43232"
									required
								/>
							</div>
							<div className="Color-Gradient">
								<div className="Color-GradientToEvent">Dégradé de l’événement</div>
								<div className="Gradient" />
							</div>
						</div>
						<div className="logo">
							<div className="URL">
								<div className="logo-URL">
									<div className="URL-logoAbsolute">URL absolue du logo</div>
									<input className="input-logoURL" required />
								</div>
								<div className="event-URL">
									<div className="URL-eventAbsolute">
										URL absolue de l’événement
									</div>
									<input className="input-eventURL" required />
								</div>
								<div className="ticketing-URL">
									<div className="URL-ticketingToEvent">
										URL absolue de la billeterie pour l’événement
									</div>
									<input className="input-ticketingURL" required />
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
							<div className="Save-Event">
								<p className="save-events-text">Sauvegarder l’événement</p>
							</div>
							<div className="Submit-Event">
								<p className="submit-events-text">Soumettre l’événement</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormOne;
