import Leaflet from 'leaflet';
import React from 'react';

import 'leaflet/dist/leaflet.css';
import './LeafletMap.scss';

export default class LeafletMap extends React.Component<any, any> {
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
	};

	public render() {
		return <div id="leaflet-map-container" />;
	}
}
