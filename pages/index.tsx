import type { NextPage } from 'next';
import ports from '../geo/ports.json';
import dynamic from 'next/dynamic';
import Map from '../components/Map';
import { useState } from 'react';

const Home: NextPage = () => {
	const [showAnchorageGroups, setShowAnchorageGroups] = useState(false);
	return (
		<div className="flex flex-col justify-center items-center">
			<div className="text-5xl text-white h-[10vh] flex items-center"></div>
			<div className="w-screen h-[80vh] flex justify-center items-center">
				<div id="menu-container" className="bg-[#0d4641] w-64 h-full select-none">
					<div className="grid grid-cols-2 gap-3 p-3">
						<div
							onClick={() => setShowAnchorageGroups(!showAnchorageGroups)}
							className="h-16 hover:cursor-pointer bg-[#198179] pl-3 rounded-md w-full col-span-2 flex flex-row items-center gap-3"
						>
							<span className="text-gray-300 text-sm font-semibold">{'Show anchorage group'}</span>
							<div
								className={
									(showAnchorageGroups ? 'bg-green-500' : 'bg-red-500') +
									' h-full w-1/5 transition-colors duration-200 rounded-r-md flex items-center justify-center'
								}
							>
								{showAnchorageGroups ? <i className="fas fa-check text-lg"></i> : <i className="fas fa-times text-lg"></i>}
							</div>
						</div>
						{/* <div className="bg-white h-7 w-full"></div> */}
					</div>
				</div>
				<div className="h-[80vh] w-full">
					<Map showAnchorageGroups={showAnchorageGroups} />
				</div>
			</div>
		</div>
	);
};

export default Home;
