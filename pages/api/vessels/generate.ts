import type { NextApiRequest, NextApiResponse } from 'next';
import { baseURL, Vessel } from '../../../util/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Vessel[]>) {
	const selectedVessel = req.body;

	const backendResponse = await (
		await fetch(`${baseURL}/vessels/generate`, {
			method: 'POST',
			body: JSON.stringify(selectedVessel),
			headers: { 'Content-Type': 'application/json' },
		})
	).json();

	res.send(backendResponse);
}
