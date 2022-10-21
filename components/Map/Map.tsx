import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import portsJSON from '../../geo/ports.json';
import { useState } from 'react';
let anchorIcon = L.icon({
	iconUrl: 'anchor.svg',
	iconSize: [25, 25],
});

export default function Map({ showAnchorageGroups }: { showAnchorageGroups: boolean }) {
	return (
		<MapContainer doubleClickZoom={false} className="map" center={[40.730789, 28.23371]} zoom={10}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{portsJSON.map((x) => {
				return x.map((y) => {
					return (
						<Marker icon={anchorIcon} position={[y.lat, y.long]}>
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
										{y.type}
									</span>
								</div>
							</Popup>
						</Marker>
					);
				});
			})}

			{showAnchorageGroups &&
				portsJSON.map((x) => {
					const anchorage = x.find((y) => y.type === 'anchorage');
					return x.map((y) =>
						y.type !== 'anchorage' && anchorage ? (
							<Polyline
								pathOptions={{ color: 'lime' }}
								positions={[
									[anchorage.lat, anchorage.long],
									[y.lat, y.long],
								]}
							/>
						) : (
							<></>
						)
					);
				})}
		</MapContainer>
	);
}
