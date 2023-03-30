import type { NextApiRequest, NextApiResponse } from 'next';
import { baseURL, Vessel } from '../../../util/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Vessel[]>) {
	const backendResponse = await (
		await fetch(`${baseURL}/vessels/select`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: req.body,
		})
	).json();
	res.send(backendResponse);
}
