import Map, { Layer, Marker, NavigationControl, Source } from 'react-map-gl';
import { useVessels } from '../../util/requests';
import portsJSON from '../../geo/ports.json';
import Popup from './Popup';
import { useState } from 'react';
export default ({ showAnchorageGroups }: { showAnchorageGroups: boolean }) => {
	const { vessels, isLoading, isError } = useVessels();
	const [selectedAnchor, setSelectedAnchor] = useState(-1);
	let count = 0;
	return (
		<Map
			doubleClickZoom={false}
			initialViewState={{
				longitude: 28.23371,
				latitude: 40.730789,
				zoom: 9,
			}}
			minZoom={9}
			maxZoom={12}
			style={{ width: '100%', height: '100%' }}
			mapStyle="mapbox://styles/erkamcaglayangorkem/cl9ynsjnn002915p5rpbut9o7"
			mapboxAccessToken="pk.eyJ1IjoiZXJrYW1jYWdsYXlhbmdvcmtlbSIsImEiOiJjbDl2bHJjNHYwNGQyM3BxYTVzZmtsamFrIn0.vtZBCG7C1IhG7BFYTIb3jQ"
		>
			{portsJSON.map((x, i) => {
				const anchorage = x.find((y) => y.type === 'anchorage');
				return x.map((y, j) => {
					count++;
					return (
						<>
							<Popup
								setSelectedAnchor={setSelectedAnchor}
								selectedAnchor={selectedAnchor}
								index={count}
								key={j}
								props={{ latitude: y.lat, longitude: y.long }}
								header={y.name}
								texts={{ Longitude: y.long.toString(), Latitude: y.lat.toString(), Type: y.type }}
							></Popup>
							{showAnchorageGroups && y.type !== 'anchorage' && anchorage && (
								<Source
									key={j + 1}
									id={'polylineLayer' + count}
									data={{
										type: 'Feature',
										properties: {},
										geometry: {
											coordinates: [
												[anchorage.long, anchorage.lat],
												[y.long, y.lat],
											],
											type: 'LineString',
										},
									}}
									type="geojson"
								>
									<Layer
										layout={{
											'line-join': 'round',
											'line-cap': 'round',
										}}
										paint={{ 'line-color': 'rgba(3, 170, 238, 0.5)', 'line-width': 5 }}
										type="line"
									/>
								</Source>
							)}
						</>
					);
				});
			})}
			<NavigationControl showCompass={false} />

			{!(isLoading || isError) &&
				vessels.map((x, i) => {
					return (
						<Marker rotation={x.course} rotationAlignment="map" key={i} longitude={x.lon} latitude={x.lat} anchor="center">
							<img alt={x.mmsi} width={30} height={30} src="vessel.png"></img>
						</Marker>
					);
				})}
		</Map>
	);
};
