import useSWR from 'swr';
import { fetcher, Port, Route, Vessel, VesselListItem } from './type';

const fetchOptions = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	refreshInterval: 0,
};

export function useVessels(
	action: 'get' | 'reset' | 'generate',
	optionalFetchOptions?: {
		revalidateIfStale?: boolean;
		revalidateOnFocus?: boolean;
		refreshInterval?: number;
	}
) {
	const { data, error } = useSWR(`/api/vessels/${action}`, fetcher, optionalFetchOptions ?? fetchOptions);

	return {
		vessels: data as VesselListItem[],
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
