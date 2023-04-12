import type { NextPage } from 'next';
import Map from '../components/Map';
import { useEffect, useState } from 'react';
import Switch from '../components/MapControllers/Switch';
import { Vessel } from '../util/type';

const Home: NextPage = () => {
	const [showAnchorageGroups, setShowAnchorageGroups] = useState(false);
	const [selectedVessel, setSelectedVessel] = useState({ mmsi: '-1', lat: 0, lon: 0, speed: 0, course: 0, heading: 0 });
	const [closestVessels, setClosestVessels] = useState([{ mmsi: '-1', lat: 0, lon: 0, speed: 0, course: 0, heading: 0 }]);
	const [showRoutes, setShowRoutes] = useState(false);
	const [showVessels, setShowVessels] = useState(true);
	const [refreshRate, setRefreshRate] = useState(3);
	const [simulationState, setSimulationState] = useState(true);
	useEffect(() => {
		if (simulationState) {
			setRefreshRate(3);
		} else {
			setRefreshRate(0);
		}
	}, [simulationState]);

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="text-5xl text-white h-[10vh] flex items-center"></div>
			<div className="w-screen h-[80vh] flex justify-center items-center">
				<div id="menu-container" className="bg-[#0d4641] w-64 h-full select-none">
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
				<div className="h-[80vh] w-full">
					<Map
						showAnchorageGroups={showAnchorageGroups}
						showRoutes={showRoutes}
						showVessels={showVessels}
						refreshRate={refreshRate}
						setSelectedVessel={setSelectedVessel}
						selectedVessel={selectedVessel}
						closestVessels={closestVessels}
						setClosestVessels={setClosestVessels}
					/>
				</div>
				<div id="menu-container" className="bg-[#0d4641] w-64 h-full select-none flex flex-col">
					<div className="text-white text-2xl text-center">Selected Vessel</div>
					<div className="bg-emerald-800 p-3 m-2 rounded-md">
						<div className="text-white">MMSI: {selectedVessel.mmsi}</div>
						<div className="text-white">Latitude: {selectedVessel.lat.toPrecision(10)}</div>
						<div className="text-white">Longitude: {selectedVessel.lon.toPrecision(10)}</div>
						<div className="text-white">Speed: {selectedVessel.speed.toPrecision(10)}</div>
						<div className="text-white">Course: {selectedVessel.course.toPrecision(10)}</div>
						<div className="text-white">Heading: {selectedVessel.heading.toPrecision(10)}</div>
					</div>
					<button
						onClick={() => {
							setSelectedVessel({ mmsi: '-1', lat: 0, lon: 0, speed: 0, course: 0, heading: 0 });
						}}
						className="bg-[#198179] col-span-2 m-4  h-16 rounded-md"
					>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
