import type { NextApiRequest, NextApiResponse } from 'next';
import { baseURL, Vessel } from '../../../util/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Vessel[]>) {
	const backendResponse = await (
		await fetch(`${baseURL}/vessels/select?selected_vessel_mmsi=${req.query.selected_vessel_mmsi}`, {
			method: 'POST',
		})
	).json();

	res.send(backendResponse);
}
