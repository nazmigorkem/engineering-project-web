export const baseURL = 'http://127.0.0.1:5000';
export const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
	fetch(input, {
		...init,
		headers: {
			...init?.headers,
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json());

export type Vessel = { mmsi: string; lat: number; lon: number; distance_per_tick: number; course: number; heading: number; aisRange: number };
export type VesselListItem = { route_id: number; from: string; to: string; end_points: Coordinate[]; vessels: Vessel[] };
export type Port = {
	name: string;
	lat: number;
	long: number;
	type: Type;
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
