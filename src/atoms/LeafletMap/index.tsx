import Leaflet from 'leaflet';
import React from 'react';
import Form, { ErrorDisplay } from 'atoms/Forms';
import 'leaflet/dist/leaflet.css';
import './LeafletMap.scss';

interface Props {
	latitude: number;
	longitude: number;
}

type State = {};

export default class LeafletMap extends React.Component<Props, State> {
	private map!: any;

	constructor(props) {
		super(props);
	}

	public componentDidMount = () => {
		const map = Leaflet.map('leaflet-map-container').setView([51.505, -0.09], 13);

		const layer = Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors',
			maxZoom: 19,
		});

		map.addLayer(layer);

		this.map = map;
	};

	public componentDidUpdate = (prevProps) => {
		if (
			this.props.latitude !== prevProps.latitude ||
			this.props.longitude !== prevProps.longitude
		) {
			const longFloat = this.props.longitude;
			const latFloat = this.props.latitude;

			if (isNaN(longFloat) || isNaN(latFloat)) {
				return;
			}

			Leaflet.marker([this.props.latitude, this.props.longitude])
				.addTo(this.map)
				.bindPopup("C'est ici ")
				.openPopup();
		}
	};

	public render() {
		return <div id="leaflet-map-container" />;
	}
}
