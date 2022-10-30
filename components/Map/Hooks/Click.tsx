import { Marker, useMapEvents } from 'react-leaflet';

export default function Click() {
	const map = useMapEvents({
		click: (e) => {
			// const marker = <Marker position={[e.latlng.lat, e.latlng.lng]}></Marker>;
		},
		locationfound: (location) => {
			console.log('location found:', location);
		},
	});
	return null;
}
