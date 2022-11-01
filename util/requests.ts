import useSWR from 'swr';
import { fetcher, Vessels } from './type';

export function useVessels() {
	const { data, error } = useSWR(`/api/vessels`, fetcher);

	return {
		vessels: data as Vessels,
		isLoading: !error && !data,
		isError: error,
	};
}
