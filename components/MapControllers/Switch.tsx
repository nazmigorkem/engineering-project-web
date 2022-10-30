import React, { Dispatch, SetStateAction } from 'react';

export default function Switch({ text, state, setState }: { text: string; state: boolean; setState: Dispatch<SetStateAction<boolean>> }) {
	return (
		<div
			onClick={() => setState(!state)}
			className="h-16 hover:cursor-pointer bg-[#198179] pl-3 rounded-md w-full col-span-2 flex flex-row items-center gap-3"
		>
			<span className="text-gray-300 text-sm font-semibold w-full">{text}</span>
			<div
				className={
					(state ? 'bg-green-500' : 'bg-red-500') +
					' h-full w-2/5 transition-colors duration-200 rounded-r-md flex items-center justify-center'
				}
			>
				{state ? <i className="fas fa-check text-lg"></i> : <i className="fas fa-times text-lg"></i>}
			</div>
		</div>
	);
}
