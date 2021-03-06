import React, { ReactComponentElement } from 'react';

import Form, { ErrorDisplay } from 'atoms/Forms';
import Input from 'atoms/Input';
import LeafletMap from 'atoms/LeafletMap';
import TextArea from 'atoms/TextArea';
import { Event } from 'tools/types';
import { randomColor } from 'tools/color';

import './EventForm.scss';
import DataFetcher from 'tools/DataFetcher';
import { latLng } from 'leaflet';

const ENTER_KEY = 13;
const MAX_COLOR_SIZE = 4;
const MAX_SIZE_DESCRIPTION = 100;
const MAX_SIZE_LONGDESCRIPTION = 600;

class EventForm extends Form<any> {
	public coordonatesSearcher: InstanceType<typeof DataFetcher>;
	public addressSearcher: InstanceType<typeof DataFetcher>;

	constructor(props: any) {
		super(props);

		this.coordonatesSearcher = new DataFetcher(
			'https://api-adresse.data.gouv.fr/search/',
			'GET',
			this.onCoordonatesFetched,
		);

		this.addressSearcher = new DataFetcher(
			'https://api-adresse.data.gouv.fr/reverse/',
			'GET',
			this.onCoordonatesFetched,
		);

		this.addValidator('beginColor', (e) => e.length === MAX_COLOR_SIZE, 'Couleur invalide');
		this.addValidator('endColor', (e) => e.length === MAX_COLOR_SIZE, 'Couleur invalide');
		this.addValidator(
			'description',
			(e) => e.length < MAX_SIZE_DESCRIPTION,
			'Description invalide',
		);
		this.addValidator(
			'longDescription',
			(e) => e.length < MAX_SIZE_LONGDESCRIPTION,
			'Descriptions invalide',
		);
	}

	private onCoordonatesFetched = (state) => {
		if (state.data && !state.loading) {
			const { data } = state;
			if (
				data.features &&
				data.features.length &&
				data.features[0].geometry &&
				data.features[0].properties
			) {
				this.onMultipleValuesChanged({
					fullAddress: data.features[0].properties.label,
					latitude: data.features[0].geometry.coordinates[1],
					longitude: data.features[0].geometry.coordinates[0],
				});
			}
		}
	};

	private onColorChanged = (e: Event<string>) => {
		this.onValueChanged({
			name: e.name,
			value: e.value.charAt(0) === '#' ? e.value : `#${e.value}`,
		});
	};

	private onTopicsChanged = (e) => {
		if (e.value === ENTER_KEY) {
			const newTopic = [...this.state.formData.topics, this.state.formData.currentTopic];
			this.onMultipleValuesChanged({
				currentTopic: '',
				topics: newTopic,
			});
		}
	};

	private onTopicsDelete = (e) => {
		const array = [...this.state.formData.topics];
		const index = parseInt(e.currentTarget.dataset.id, 2);
		array.splice(index, 1);
		this.onValueChanged({
			name: 'topics',
			value: array,
		});
	};

	private onMapCoordonatesChanged = (lat: number, lng: number) => {
		this.onMultipleValuesChanged({
			latitude: lat,
			longitude: lng,
		});

		if (lat && lng) {
			this.addressSearcher.fetch(
				null,
				`?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}`,
			);
		}
	};

	private onAddressChanged = (e) => {
		this.onValueChanged(e);

		if (e.value) {
			this.coordonatesSearcher.fetch(
				null,
				`?limit=1&autocomplete=0&q=${encodeURIComponent(e.value)}`,
			);
		}
	};

	public componentWillUnmount = () => {
		this.coordonatesSearcher.unsubscribe();
	};

	public getInitialState() {
		return {
			formData: {
				beginColor: '#',
				currentTopic: '',
				endColor: '#',
				latitude: ' ',
				longitude: ' ',
				topics: [],
			},
		};
	}

	public render() {
		return this.getForm(
			<>
				<Input
					name="name"
					label="Nom de l'événement*"
					className="input-event-name"
					value={this.state.formData.name}
					onChange={this.onValueChanged}
					type="text"
					required={true}
				/>
				<div className="date-and-place">
					<div className="start">
						<div className="from">Du</div>

						<Input
							name="startDate"
							label="Debut de l'événement*"
							className="input-start-date"
							value={this.state.formData.startDate}
							onChange={this.onValueChanged}
							type="date"
							required={true}
						/>
					</div>
					<div className="end">
						<div className="to">au</div>

						<Input
							name="endDate"
							label="Fin de l'événement*"
							className="input-end-date"
							value={this.state.formData.endDate}
							onChange={this.onValueChanged}
							type="date"
							required={true}
						/>
					</div>
					<div className="places">
						<div className="in">à</div>

						<Input
							name="address"
							label="Nom du lieu où est organisé l'événement*"
							className="input-address"
							value={this.state.formData.address}
							onChange={this.onValueChanged}
							type="text"
							required={true}
						/>
					</div>
				</div>
				<div className="address">
					<div className="full-address-input">
						<Input
							name="fullAddress"
							label="Adresse complète du lieu*"
							className="input-full-address-of-the-place"
							value={this.state.formData.fullAddress}
							onChange={this.onAddressChanged}
							debounce={600}
							type="text"
							required={true}
						/>
						<Input
							name="longitude"
							label="Longitude"
							className="input-longitude"
							value={this.state.formData.longitude}
							onChange={this.onValueChanged}
							type="number"
							min={-180}
							max={180}
							required={false}
							step={0.0000000000001}
						/>
						<Input
							name="latitude"
							label="Latitude"
							className="input-latitude"
							value={this.state.formData.latitude}
							onChange={this.onValueChanged}
							type="number"
							min={-90}
							max={90}
							required={false}
							step={0.0000000000001}
						/>
					</div>
					<LeafletMap
						longitude={this.state.formData.longitude}
						latitude={this.state.formData.latitude}
						onCoordonatesChanged={this.onMapCoordonatesChanged}
					/>
				</div>
				<div className="short-description">
					<Input
						name="description"
						label="Description courte (100 caractères maximum)*"
						className="input-short-description"
						value={this.state.formData.description}
						onChange={this.onValueChanged}
						type="text"
						required={true}
					/>
					<ErrorDisplay for="description" />
					<TextArea
						label="
									Description complète (600 caractères maximum)"
						name="longDescription"
						className="textarea-long-description"
						value={this.state.formData.longDescription}
						onChange={this.onValueChanged}
					/>
					<ErrorDisplay for="longDescription" />
				</div>
				<div className="category">
					<div className="categories">
						<Input
							name="currentTopic"
							label="Catégories pour retrouver l’événement"
							className="input-topics"
							value={this.state.formData.currentTopic}
							onChange={this.onValueChanged}
							onKeyDown={this.onTopicsChanged}
							type="text"
							required={false}
						/>
					</div>
					<div className="categories-topics">
						<div className="topics-add">
							{this.state.formData.topics.map((newTopic, i) => (
								<div
									key={i}
									className="topics-add-new"
									style={{
										backgroundColor: randomColor(newTopic),
									}}>
									<div
										className="delete-block"
										data-id={i}
										onClick={this.onTopicsDelete}>
										<div className="cross" />
									</div>
									<p className="topics-add-new-text">{newTopic}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="color">
					<div className="color-primary-secondary">
						<div className="color-primary">
							<Input
								name="beginColor"
								label="Couleur primaire de l'évènement*"
								className="input-color-primary"
								value={this.state.formData.beginColor}
								onChange={this.onColorChanged}
								type="text"
								required={true}
							/>
							<ErrorDisplay for="beginColor" />
						</div>
						<div className="color-secondary">
							<Input
								name="endColor"
								label="Couleur secondaire de l'évènement*"
								className="input-color-secondary"
								value={this.state.formData.endColor}
								onChange={this.onColorChanged}
								type="text"
								required={true}
							/>
							<ErrorDisplay for="endColor" />
						</div>
					</div>
					<div className="color-gradient">
						<div className="color-gradient-to-event">Dégradé de l’événement</div>
						<div
							className="gradient"
							style={{
								backgroundImage: `linear-gradient(to right, ${this.state.formData.beginColor}, ${this.state.formData.endColor})`,
							}}
						/>
					</div>
				</div>
				<div className="logo">
					<div className="url">
						<div className="logo-url">
							<Input
								name="urlLogoAbsolute"
								label="URL absolue du logo"
								className="input-logo-url"
								value={this.state.formData.urlLogoAbsolute}
								onChange={this.onValueChanged}
								type="text"
								required={false}
							/>
						</div>
						<div className="event-url">
							<Input
								name="urlEventAbsolute"
								label="URL absolue de l’événement"
								className="input-event-url"
								value={this.state.formData.urlEventAbsolute}
								onChange={this.onValueChanged}
								type="text"
								required={false}
							/>
						</div>
						<div className="ticketing-url">
							<Input
								name="ticketingUrl"
								label="URL absolue de la billeterie pour l’événement"
								className="input-ticketing-url"
								value={this.state.formData.ticketingUrl}
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

				<div className="button-event">
					<div className="left-button">
						<button className="save-event">Sauvegarder l’événement</button>
					</div>
					<div className="right-button">
						<button className="submit-event">Soumettre l’événement</button>
					</div>
				</div>
			</>,
		);
	}
}

export default EventForm;
