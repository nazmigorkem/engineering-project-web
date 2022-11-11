export const baseURL = 'http://127.0.0.1:5000';
export const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then((res) => res.json());

export type Vessel = { mmsi: string; lat: number; lon: number; speed: number; course: number; heading: number };
export type Port = {
	name: string;
	lat: number;
	long: number;
	type: Type;
};

export type Route = {
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
