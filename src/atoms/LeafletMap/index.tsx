import Leaflet, { LatLng, latLng, LeafletEventHandlerFn, LeafletEvent } from 'leaflet';
import React from 'react';
import Form, { ErrorDisplay } from 'atoms/Forms';
import 'leaflet/dist/leaflet.css';
import './LeafletMap.scss';

const LATITUDE_MAP = 44.853383;
const LONGITUDE_MAP = -0.587876;
const ZOOM_MAX = 13;

delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Props {
	latitude: number;
	longitude: number;

	onCoordonatesChanged?(latitude: number, longitude: number): void;
}

type State = {
	marker?: Leaflet.Marker;
};

export default class LeafletMap extends React.Component<Props, State> {
	private map!: any;

	constructor(props) {
		super(props);

		this.state = {};
	}

	public componentDidMount = () => {
		const map = Leaflet.map('leaflet-map-container').setView(
			[LATITUDE_MAP, LONGITUDE_MAP],
			ZOOM_MAX,
		);

		const layer = Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors',
			maxZoom: 19,
		});

		map.addLayer(layer);

		this.map = map;

		map.on('click', this.onMapClick as any);
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

			this.createOrUpdateMarker(this.props.latitude, this.props.longitude);
		}
	};

	public createOrUpdateMarker = (latitude: number, longitude: number) => {
		let myMarker;

		if (!this.state.marker) {
			myMarker = Leaflet.marker([latitude, longitude], {
				draggable: true,
			}).addTo(this.map);

			this.setState({ marker: myMarker });
		} else {
			myMarker = this.state.marker;

			const newMarkerPosition = new Leaflet.LatLng(latitude, longitude);

			myMarker.setLatLng(newMarkerPosition);
		}

		this.map.setView(myMarker.getLatLng(), this.map.getZoom());
	};

	public onMapClick = (e: Leaflet.LeafletMouseEvent) => {
		this.createOrUpdateMarker(e.latlng.lat, e.latlng.lng);

		if (this.props.onCoordonatesChanged) {
			this.props.onCoordonatesChanged(e.latlng.lat, e.latlng.lng);
		}
	};

	public render() {
		return <div id="leaflet-map-container" />;
	}
}
