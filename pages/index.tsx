import type { NextPage } from 'next';
import Map from '../components/Map';
import { useEffect, useState } from 'react';
import Switch from '../components/MapControllers/Switch';

const Home: NextPage = () => {
	const [showAnchorageGroups, setShowAnchorageGroups] = useState(false);
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
							className="bg-[#198179] col-span-2 h-16 rounded-md"
						>
							Restart Simulation
						</button>
					</div>
				</div>
				<div className="h-[80vh] w-full">
					<Map showAnchorageGroups={showAnchorageGroups} showRoutes={showRoutes} showVessels={showVessels} refreshRate={refreshRate} />
				</div>
			</div>
		</div>
	);
};

export default Home;
