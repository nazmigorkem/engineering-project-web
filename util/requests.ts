import useSWR from 'swr';
import { fetcher, Port, Route, Vessel } from './type';

const fetchOptions = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	refreshInterval: 0,
};

export function useVessels(action: 'get' | 'generate') {
	const { data, error } = useSWR(`/api/vessels/${action}`, fetcher, fetchOptions);

	return {
		vessels: data as Vessel[][],
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
