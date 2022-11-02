import { Marker, MarkerProps } from 'react-map-gl';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function main({
	props,
	header,
	texts,
	index,
	selectedAnchor,
	setSelectedAnchor,
}: {
	props: MarkerProps;
	header: string;
	texts: { [key: string]: string };
	index: number;
	selectedAnchor: number;
	setSelectedAnchor: Dispatch<SetStateAction<number>>;
}) {
	const [show, setShow] = useState(false);

	return (
		<>
			<Marker style={{ cursor: 'pointer' }} onClick={() => setSelectedAnchor(index)} {...props}>
				<img
					className={index === selectedAnchor ? 'outline-4 outline outline-orange-600 rounded-sm' : ''}
					alt={header}
					width={30}
					height={30}
					src="anchor.svg"
				></img>
			</Marker>
			{index === selectedAnchor && (
				<div className="flex flex-col absolute bg-slate-500 z-10 p-5 w-[14rem] top-0 left-0">
					<span className="font-semibold text-lg">{header}</span>
					{Object.keys(texts).map((x) => {
						return (
							<span className="tooltip-text">
								<span className="text-sm">{`${x}: `}</span>
								{texts[x]}
							</span>
						);
					})}
				</div>
			)}
		</>
	);
}
