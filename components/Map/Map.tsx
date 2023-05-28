import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, ScaleControl, Circle, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { usePorts, useRoutes } from '../../util/requests';
let anchorIcon = L.icon({
	iconUrl: 'anchor.svg',
	iconSize: [25, 25],
});

let vesselIcon = L.icon({
	iconUrl: 'vessel.svg',
	iconSize: [25, 25],
});

let selectedVesselIcon = L.icon({
	iconUrl: 'selected_vessel.svg',
	iconSize: [25, 25],
});

let closestVesselIcon = L.icon({
	iconUrl: 'closest_vessel.svg',
	iconSize: [25, 25],
});

import 'leaflet-rotatedmarker';
import RotatedMarker from './RotatedMarker';
import { Dispatch, SetStateAction } from 'react';
import { Vessel, VesselGenerationResponse } from '../../util/type';

export default function Map({
	showRoutes,
	showVessels,
	selectedVessel,
	vessels,
	setSelectedVessel,
}: {
	showRoutes: boolean;
	showVessels: boolean;
	refreshRate: number;
	selectedVessel: Vessel;
	vessels: VesselGenerationResponse;
	setSelectedVessel: Dispatch<SetStateAction<Vessel>>;
}) {
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
				vessels.generated_vessels !== undefined &&
				showVessels &&
				vessels.generated_vessels.map((x, i) => {
					return x.vessels.map((y, i) => {
						const isSelected = selectedVessel.mmsi === y.mmsi;
						const isClosest = vessels.range_check.closest_vessels.some((z) => y.mmsi === z.mmsi);
						return (
							<RotatedMarker
								eventHandlers={{
									click: async (event: any) => {
										if (!isSelected) {
											const result = await (
												await fetch(`/api/vessels/select?selected_vessel_mmsi=${y.mmsi}`, {
													method: 'POST',
												})
											).json();

											vessels.generated_vessels = vessels.generated_vessels;
											vessels.range_check.closest_vessels = result.closest_vessels;
											vessels.range_check.detected_dark_activity_vessels_by_fsm = result.detected_dark_activity_vessels_by_fsm;
											vessels.range_check.detected_dark_activity_vessels_by_ml = result.detected_dark_activity_vessels_by_ml;

											setSelectedVessel(y);
										}
									},
								}}
								rotationOrigin="center"
								rotationAngle={y.course}
								key={i}
								icon={isSelected ? selectedVesselIcon : isClosest ? closestVesselIcon : vesselIcon}
								position={[y.position.latitude_in_degrees, y.position.longitude_in_degrees]}
							>
								<Tooltip>{'MMSI: ' + y.mmsi}</Tooltip>
								{isClosest ? (
									<>
										<Circle
											center={[y.position.latitude_in_degrees, y.position.longitude_in_degrees]}
											radius={y.ais_range}
											pathOptions={{ color: '#277370', fill: false, fillOpacity: 1 }}
										/>
									</>
								) : (
									<></>
								)}
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
										<Circle center={[y[0], y[1]]} radius={300} pathOptions={{ color: '#277370', fill: true, fillOpacity: 1 }} />
										<Circle
											center={[next[0], next[1]]}
											radius={300}
											pathOptions={{ color: '#277370', fill: true, fillOpacity: 1 }}
										/>
									</>
								) : (
									<Circle center={[y[0], y[1]]} radius={300} pathOptions={{ color: '#277370', fill: true, fillOpacity: 1 }} />
								)}
								<Polyline
									key={i}
									positions={[
										[y[0], y[1]],
										[next[0], next[1]],
									]}
									pathOptions={{ color: '#277370' }}
								></Polyline>
							</>
						);
					});
				})}
			<ScaleControl imperial={false} />
		</MapContainer>
	);
}
