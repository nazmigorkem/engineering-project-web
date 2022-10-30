import type { NextPage } from 'next';
import ports from '../geo/ports.json';
import dynamic from 'next/dynamic';
import Map from '../components/Map';
import { useState } from 'react';
import Switch from '../components/MapControllers/Switch';

const Home: NextPage = () => {
	const [showAnchorageGroups, setShowAnchorageGroups] = useState(false);
	return (
		<div className="flex flex-col justify-center items-center">
			<div className="text-5xl text-white h-[10vh] flex items-center"></div>
			<div className="w-screen h-[80vh] flex justify-center items-center">
				<div id="menu-container" className="bg-[#0d4641] w-64 h-full select-none">
					<div className="grid grid-cols-2 gap-3 p-3">
						<Switch text="Show anchorage group" state={showAnchorageGroups} setState={setShowAnchorageGroups}></Switch>
						{/* <div className="bg-white h-7 w-full"></div> */}
					</div>
				</div>
				<div className="h-[80vh] w-full cursor-crosshair">
					<Map showAnchorageGroups={showAnchorageGroups} />
				</div>
			</div>
		</div>
	);
};

export default Home;
