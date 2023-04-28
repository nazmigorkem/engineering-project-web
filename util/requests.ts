import useSWR from 'swr';
import { fetcher, Port, Route, Vessel, VesselGenerationResponse, VesselListItem } from './type';

const fetchOptions = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	refreshInterval: 0,
};

export function useVessels(
	action: 'get' | 'reset' | 'generate',
	query?: string,
	optionalFetchOptions?: {
		revalidateIfStale?: boolean;
		revalidateOnFocus?: boolean;
		refreshInterval?: number;
	}
) {
	const { data, error } = useSWR(
		`/api/vessels/${action}`,
		(input: RequestInfo | URL, init?: RequestInit | undefined) =>
			fetch(input, {
				...init,
				body: query,
				method: 'POST',
				headers: {
					...init?.headers,

					'Content-Type': 'application/json',
				},
			}).then((res) => res.json()),
		optionalFetchOptions ?? fetchOptions
	);

	return {
		vessels: data as VesselGenerationResponse,
		isLoading: !error && !data,
		isError: error,
	};
}

export function usePorts(action: 'get') {
	const { data, error } = useSWR(`/api/ports/${action}`, fetcher, fetchOptions);

	return {
		ports: data as Port[][],
		isLoading: !error && !data,
		isError: error,
	};
}

export function useRoutes(action: 'get') {
	const { data, error } = useSWR(`/api/routes/${action}`, fetcher, fetchOptions);

	return {
		routes: data as Route[],
		isLoading: !error && !data,
		isError: error,
	};
}
