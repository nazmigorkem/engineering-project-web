import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import portsJSON from '../../geo/ports.json';
import { useVessels } from '../../util/requests';
let anchorIcon = L.icon({
	iconUrl: 'anchor.svg',
	iconSize: [25, 25],
});

let vesselIcon = L.icon({
	iconUrl: 'vessel.png',
	iconSize: [25, 25],
});

import 'leaflet-rotatedmarker';

export default function Map({ showAnchorageGroups }: { showAnchorageGroups: boolean }) {
	const { vessels, isLoading, isError } = useVessels();

	return (
		<MapContainer doubleClickZoom={false} className="map" center={[40.730789, 28.23371]} zoom={10}>
			<TileLayer
				attribution='<a href=\"https://cartiqo.nl/\" target=\"_blank\">© Cartiqo</a> <a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">© MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">© OpenStreetMap contributors</a>'
				url="https://api.maptiler.com/maps/basic-v2-dark/{z}/{x}/{y}.png?key=SLP3RxVFTmor8XjBW5gA"
			/>
			{portsJSON.map((x) => {
				const anchorage = x.find((y) => y.type === 'anchorage');
				return x.map((y, i) => {
					return (
						<Marker key={i} icon={anchorIcon} position={[y.lat, y.long]}>
							<Popup>
								<div className="flex flex-col">
									<span className="font-semibold text-lg">{y.name}</span>
									<span className="tooltip-text">
										<span className="text-sm">{'Latitude: '}</span>
										{y.lat}
									</span>
									<span className="tooltip-text">
										<span className="text-sm">{'Longitude: '}</span>
										{y.long}
									</span>
									<span className="tooltip-text">
										<span className="text-sm">{'Type: '}</span>
										{y.type[0].toUpperCase() + y.type.slice(1)}
									</span>
									{y.type !== 'anchorage' && anchorage ? (
										<span className="tooltip-text">
											<span className="text-sm">{'Anchorage: '}</span>
											{anchorage.name}
										</span>
									) : (
										<></>
									)}
								</div>
							</Popup>
						</Marker>
					);
				});
			})}

			{!(isLoading || isError) &&
				vessels.map((x, i) => {
					return <Marker rotationOrigin="center" rotationAngle={x.course} key={i} icon={vesselIcon} position={[x.lat, x.lon]}></Marker>;
				})}

			{showAnchorageGroups &&
				portsJSON.map((x) => {
					const anchorage = x.find((y) => y.type === 'anchorage');
					return x.map(
						(y, i) =>
							y.type !== 'anchorage' &&
							anchorage && (
								<Polyline
									key={i}
									pathOptions={{ color: 'lime' }}
									positions={[
										[anchorage.lat, anchorage.long],
										[y.lat, y.long],
									]}
								/>
							)
					);
				})}
		</MapContainer>
	);
}
