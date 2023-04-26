import type { NextPage } from 'next';
import Map from '../components/Map';
import { useEffect, useState } from 'react';
import Switch from '../components/MapControllers/Switch';
import { useVessels } from '../util/requests';

const Home: NextPage = () => {
	const [showAnchorageGroups, setShowAnchorageGroups] = useState(false);
	const [selectedVessel, setSelectedVessel] = useState({
		mmsi: -1,
		position: {
			latitude_in_degrees: 0,
			latitude_in_radians: 0,
			longitude_in_degrees: 0,
			longitude_in_radians: 0,
		},
		course: 0,
		heading: 0,
		bearing: 0,
		vessel_type: '',
		distance_per_tick: 0,
		ais_range: 0,
		ais_broadcast_interval: 0,
		current_route_index: 0,
		is_going_reverse_route: false,
		dark_activity: false,
		last_distance_to_current_mid_point_end: 0,
	});

	const [showRoutes, setShowRoutes] = useState(false);
	const [showVessels, setShowVessels] = useState(true);
	const [refreshRate, setRefreshRate] = useState(0.3);
	const [simulationState, setSimulationState] = useState(true);
	const {
		vessels,
		isLoading: isVesselsLoading,
		isError: isVesselsError,
	} = useVessels('generate', `${selectedVessel ? JSON.stringify(selectedVessel) : undefined}`, {
		refreshInterval: refreshRate * 1000,
		revalidateIfStale: false,
		revalidateOnFocus: false,
	});
	useEffect(() => {
		if (simulationState) {
			setRefreshRate(3);
		} else {
			setRefreshRate(0);
		}
	}, [simulationState]);
	if (isVesselsLoading) {
		return <></>;
	}
	return (
		<div>
			<div className="w-screen h-[100vh] flex">
				<div id="menu-container" className="bg-[#0d4641] w-96 h-full select-none">
					<div className="grid grid-cols-2 gap-3 p-3">
						<Switch text="Show vessels" state={showVessels} setState={setShowVessels} />
						<Switch text="Show routes" state={showRoutes} setState={setShowRoutes} />
						<Switch text="Show anchorage group" state={showAnchorageGroups} setState={setShowAnchorageGroups} />
						<Switch text="Simulation start/stop" state={simulationState} setState={setSimulationState} />
						<button
							onClick={() => {
								fetch('/api/vessels/reset');
							}}
							className="bg-[#198179] col-span-2 h-16 rounded-md hover:bg-opacity-80 duration-200 font-semibold"
						>
							Restart Simulation
						</button>
					</div>
				</div>
				<div className="h-[100vh] w-full">
					<Map
						showAnchorageGroups={showAnchorageGroups}
						showRoutes={showRoutes}
						showVessels={showVessels}
						refreshRate={refreshRate}
						setSelectedVessel={setSelectedVessel}
						selectedVessel={selectedVessel}
						vessels={vessels}
					/>
				</div>

				<div id="menu-container" className="bg-[#0d4641] w-96 h-full select-none flex flex-col">
					<div className="text-white text-2xl p-5 text-center">Selected Vessel</div>
					<div className="bg-emerald-800 p-3 mx-2 rounded-md">
						<div className="text-white">Vessel Type: {selectedVessel.vessel_type}</div>
						<div className="text-white">MMSI: {selectedVessel.mmsi}</div>
						<div className="text-white">Latitude: {selectedVessel.position.latitude_in_degrees.toPrecision(10)}</div>
						<div className="text-white">Longitude: {selectedVessel.position.longitude_in_degrees.toPrecision(10)}</div>
						<div className="text-white">Speed: {selectedVessel.distance_per_tick.toPrecision(10) + ' meters per tick'}</div>
						<div className="text-white">Course: {selectedVessel.course.toPrecision(10)}</div>
						<div className="text-white">Heading: {selectedVessel.heading.toPrecision(10)}</div>
					</div>
					<button
						onClick={() => {
							setSelectedVessel({
								mmsi: -1,
								position: {
									latitude_in_degrees: 0,
									latitude_in_radians: 0,
									longitude_in_degrees: 0,
									longitude_in_radians: 0,
								},
								course: 0,
								heading: 0,
								bearing: 0,
								vessel_type: '',
								distance_per_tick: 0,
								ais_range: 0,
								ais_broadcast_interval: 0,
								current_route_index: 0,
								is_going_reverse_route: false,
								dark_activity: false,
								last_distance_to_current_mid_point_end: 0,
							});
							vessels.range_check.closest_vessels = [];
						}}
						className="bg-[#198179] col-span-2 p-2 mx-2 mt-2 rounded-md hover:bg-opacity-80 duration-200 font-semibold"
					>
						Reset
					</button>
					<div className="text-white text-2xl p-5 text-center">Closest Vessels</div>
					<div className="overflow-y-auto space-y-2 h-[200rem]">
						{vessels.range_check.closest_vessels.map((x, i) => {
							return (
								<div key={i} className="bg-emerald-800 p-3 mx-2 rounded-md">
									<div className="text-white">Vessel Type: {x.vessel_type}</div>
									<div className="text-white">MMSI: {x.mmsi}</div>
									<div className="text-white">Latitude: {x.position.latitude_in_degrees.toPrecision(10)}</div>
									<div className="text-white">Longitude: {x.position.longitude_in_degrees.toPrecision(10)}</div>
									<div className="text-white">Speed: {x.distance_per_tick.toPrecision(10) + ' meters per tick'}</div>
									<div className="text-white">Course: {x.course.toPrecision(10)}</div>
									<div className="text-white">Heading: {x.heading.toPrecision(10)}</div>
									<div className="text-white flex items-center gap-3">
										Dark Activity: {'' + x.dark_activity}
										<button
											className="p-3 hover:cursor-pointer hover:bg-red-700 duration-200 bg-red-500 rounded-md"
											onClick={async () => {
												await fetch(
													`/api/vessels/dark_activity?is_dark_activity=${true}&selected_vessel_mmsi_for_dark_activity=${
														x.mmsi
													}`,
													{
														method: 'POST',
													}
												);
											}}
										></button>
									</div>
								</div>
							);
						})}
					</div>
					<div className="text-white text-2xl p-5 text-center">Closest Dark Activity Vessels</div>
					<div className="overflow-y-auto space-y-2 h-[200rem]">
						{vessels.range_check.closest_dark_activity_vessels.map((x, i) => {
							return (
								<div key={i} className="bg-emerald-800 p-3 mx-2 rounded-md">
									<div className="text-white">Vessel Type: {x.vessel_type}</div>
									<div className="text-white">MMSI: {x.mmsi}</div>
									<div className="text-white">Latitude: {x.position.latitude_in_degrees.toPrecision(10)}</div>
									<div className="text-white">Longitude: {x.position.longitude_in_degrees.toPrecision(10)}</div>
									<div className="text-white">Speed: {x.distance_per_tick.toPrecision(10) + ' meters per tick'}</div>
									<div className="text-white">Course: {x.course.toPrecision(10)}</div>
									<div className="text-white">Heading: {x.heading.toPrecision(10)}</div>
									<div className="text-white flex items-center gap-3">
										Dark Activity: {'' + x.dark_activity}
										<button
											className="p-3 hover:cursor-pointer hover:bg-green-700 duration-200 bg-green-500 rounded-md"
											onClick={async () => {
												await fetch(
													`/api/vessels/dark_activity?is_dark_activity=${false}&selected_vessel_mmsi_for_dark_activity=${
														x.mmsi
													}`,
													{
														method: 'POST',
													}
												);
											}}
										></button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
