export const baseURL = 'http://127.0.0.1:5000/';
export const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) => fetch(input, init).then((res) => res.json());

export type Vessels = [
	{
		lat: number;
		lon: number;
	}
];
