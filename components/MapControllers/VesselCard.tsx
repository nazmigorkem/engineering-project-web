import { Vessel } from '../../util/type';

export default function VesselCard({ vessel }: { vessel: Vessel }) {
	return (
		<>
			<div className="text-white">Vessel Type: {vessel.vessel_type}</div>
			<div className="text-white">MMSI: {vessel.mmsi}</div>
			<div className="text-white">Latitude: {vessel.position.latitude_in_degrees.toPrecision(10)}</div>
			<div className="text-white">Longitude: {vessel.position.longitude_in_degrees.toPrecision(10)}</div>
			<div className="text-white">Speed: {vessel.distance_per_tick.toPrecision(10) + ' meters per tick'}</div>
			<div className="text-white">Course: {vessel.course.toPrecision(10)}</div>
			<div className="text-white">Heading: {vessel.heading.toPrecision(10)}</div>
		</>
	);
}
