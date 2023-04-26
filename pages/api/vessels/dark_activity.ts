import type { NextApiRequest, NextApiResponse } from 'next';
import { baseURL, Vessel } from '../../../util/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Vessel[]>) {
	const backendResponse = await (
		await fetch(
			`${baseURL}/vessels/dark_activity?is_dark_activity=${req.query.is_dark_activity}&selected_vessel_mmsi_for_dark_activity=${req.query.selected_vessel_mmsi_for_dark_activity}`,
			{
				method: 'POST',
			}
		)
	).json();

	res.send(backendResponse);
}
