import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, ScaleControl, Circle, Rectangle } from 'react-leaflet';
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
import RotatedMarker from './RotatedMarker';

export default function Map({
	showAnchorageGroups,
	showRoutes,
	showVessels,
}: {
	showAnchorageGroups: boolean;
	showRoutes: boolean;
	showVessels: boolean;
}) {
	const {
		vessels,
		isLoading: isVesselsLoading,
		isError: isVesselsError,
	} = useVessels('generate', { refreshInterval: 3000, revalidateIfStale: true });
	const { ports, isLoading: isPortsLoading, isError: isPortsError } = usePorts('get');
	const { routes, isLoading: isRoutesLodaing, isError: isRoutesError } = useRoutes('get');

	return (
		<MapContainer style={{ backgroundColor: '#232323' }} doubleClickZoom={false} className="map" center={[40.730789, 28.23371]} zoom={10}>
			<TileLayer url="https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}.png?key=SLP3RxVFTmor8XjBW5gA" />
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
				showVessels &&
				vessels.map((x, i) => {
					return x.vessels.map((y, i) => {
						return (
							<RotatedMarker rotationOrigin="center" rotationAngle={y.course} key={i} icon={vesselIcon} position={[y.lat, y.lon]}>
								<Popup>
									<div className="flex flex-col">
										<span className="tooltip-text">
											<span className="text-sm">{'MMSI: '}</span>
											{y.mmsi}
										</span>
										<span className="tooltip-text">
											<span className="text-sm">{'Latitude: '}</span>
											{y.lat}
										</span>
										<span className="tooltip-text">
											<span className="text-sm">{'Longitude: '}</span>
											{y.lon}
										</span>
										<span className="tooltip-text">
											<span className="text-sm">{'Course: '}</span>
											{y.course}
										</span>
										<span className="tooltip-text">
											<span className="text-sm">{'Heading: '}</span>
											{y.heading}
										</span>
									</div>
								</Popup>
							</RotatedMarker>
						);
					});
				})}
			{routes !== undefined &&
				showRoutes &&
				routes.map((x, i) => {
					return x.coordinates.map((y, i) => {
						if (x.coordinates.length - 1 === i) return;
						const next = x.coordinates[i + 1];
						return (
							<>
								{x.coordinates.length - 2 === i ? (
									<>
										<Circle center={[y[1], y[0]]} radius={300} pathOptions={{ color: '#277370', fill: true, fillOpacity: 1 }} />
										<Circle
											center={[next[1], next[0]]}
											radius={300}
											pathOptions={{ color: '#277370', fill: true, fillOpacity: 1 }}
										/>
									</>
								) : (
									<Circle center={[y[1], y[0]]} radius={300} pathOptions={{ color: '#277370', fill: true, fillOpacity: 1 }} />
								)}
								<Polyline
									key={i}
									positions={[
										[y[1], y[0]],
										[next[1], next[0]],
									]}
									pathOptions={{ color: '#277370' }}
								></Polyline>
							</>
						);
					});
				})}
			<ScaleControl imperial={false} />
			{!ports !== undefined &&
				showAnchorageGroups &&
				ports.map((x) => {
					const anchorage = x.find((y) => y.type === 'anchorage');
					return x.map(
						(y, i) =>
							y.type !== 'anchorage' &&
							anchorage && (
								<>
									<Polyline
										key={i}
										pathOptions={{ color: 'lime' }}
										positions={[
											[anchorage.lat, anchorage.long],
											[y.lat, y.long],
										]}
									/>
								</>
							)
					);
				})}
		</MapContainer>
	);
}
