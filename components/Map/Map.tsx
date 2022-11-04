import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, ScaleControl } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { usePorts, useRoutes, useVessels } from '../../util/requests';
let anchorIcon = L.icon({
	iconUrl: 'anchor.svg',
	iconSize: [25, 25],
});

let vesselIcon = L.icon({
	iconUrl: 'vessel.svg',
	iconSize: [25, 25],
});
import 'leaflet-rotatedmarker';

export default function Map({ showAnchorageGroups, showRoutes }: { showAnchorageGroups: boolean; showRoutes: boolean }) {
	const { vessels, isLoading: isVesselsLoading, isError: isVesselsError } = useVessels();
	const { ports, isLoading: isPortsLoading, isError: isPortsError } = usePorts();
	const { routes, isLoading: isRoutesLodaing, isError: isRoutesError } = useRoutes();

	return (
		<MapContainer style={{ backgroundColor: '#232323' }} doubleClickZoom={false} className="map" center={[40.730789, 28.23371]} zoom={10}>
			<TileLayer
				attribution='<a href=\"https://cartiqo.nl/\" target=\"_blank\">© Cartiqo</a> <a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">© MapTiler</a> <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">© OpenStreetMap contributors</a>'
				url="https://api.maptiler.com/maps/darkmatter/{z}/{x}/{y}.png?key=SLP3RxVFTmor8XjBW5gA"
			/>
			{ports !== undefined &&
				ports.map((x) => {
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

			{vessels !== undefined &&
				vessels.map((x, i) => {
					return x.map((y, i) => {
						return <Marker rotationOrigin="center" rotationAngle={y.course} key={i} icon={vesselIcon} position={[y.lat, y.lon]}></Marker>;
					});
				})}
			{routes !== undefined &&
				showRoutes &&
				routes.map((x, i) => {
					return x.coordinates.map((y, i) => {
						if (x.coordinates.length - 1 === i) return;
						const next = x.coordinates[i + 1];
						return (
							<Polyline
								key={i}
								positions={[
									[y[1], y[0]],
									[next[1], next[0]],
								]}
								pathOptions={{ color: 'red' }}
							></Polyline>
						);
					});
				})}
			<ScaleControl imperial={false} />
			{!isPortsLoading &&
				showAnchorageGroups &&
				ports.map((x) => {
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
