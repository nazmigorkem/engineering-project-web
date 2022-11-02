import useSWR from 'swr';
import { fetcher, Port, Vessel } from './type';

const fetchOptions = {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	refreshInterval: 5000,
};

export function useVessels() {
	const { data, error } = useSWR(`/api/vessels`, fetcher, fetchOptions);

	return {
		vessels: data as Vessel,
		isLoading: !error && !data,
		isError: error,
	};
}

export function usePorts() {
	const { data, error } = useSWR(`/api/ports`, fetcher, fetchOptions);

	return {
		vessels: data as Port,
		isLoading: !error && !data,
		isError: error,
	};
}
