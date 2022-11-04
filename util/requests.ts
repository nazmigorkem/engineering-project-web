import useSWR from 'swr';
import { fetcher, Port, Route, Vessel } from './type';

const fetchOptions = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	refreshInterval: 5000,
};

export function useVessels() {
	const { data, error } = useSWR(`/api/vessels`, fetcher, fetchOptions);

	return {
		vessels: data as Vessel[][],
		isLoading: !error && !data,
		isError: error,
	};
}

export function usePorts() {
	const { data, error } = useSWR(`/api/ports`, fetcher, fetchOptions);

	return {
		ports: data as Port[][],
		isLoading: !error && !data,
		isError: error,
	};
}

export function useRoutes() {
	const { data, error } = useSWR(`/api/routes`, fetcher, fetchOptions);

	return {
		routes: data as Route[],
		isLoading: !error && !data,
		isError: error,
	};
}
