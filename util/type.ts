export const baseURL = 'http://127.0.0.1:5000';
export const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
	fetch(input, {
		...init,
		headers: {
			...init?.headers,
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json());

export type Vessel = {
	mmsi: number;
	position: LatLongExpression;
	course: number;
	heading: number;
	bearing: number;
	vessel_type: string;
	distance_per_tick: number;
	ais_range: number;
	ais_broadcast_interval: number;
	current_route_index: number;
	is_going_reverse_route: boolean;
	last_distance_to_current_mid_point_end: number;
};
export type VesselListItem = { route_id: number; from: string; to: string; end_points: Coordinate[]; vessels: Vessel[] };
export type Port = {
	name: string;
	lat: number;
	long: number;
	type: Type;
};

export type LatLongExpression = {
	latitude_in_degrees: number;
	latitude_in_radians: number;
	longitude_in_degrees: number;
	longitude_in_radians: number;
};

export type Route = {
	route_id: number;
	from: string;
	to: string;
	density: number[];
	noise: number[];
	coordinates: Coordinate[];
};

export type Coordinate = [lon: number, lat: number];
export enum Type {
	Anchorage = 'anchorage',
	Port = 'port',
}
