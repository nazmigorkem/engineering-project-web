// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { baseURL, Port, Vessel } from '../../../util/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Port>) {
	const backendResponse = await (await fetch(`${baseURL}/ports`)).json();
	res.send(backendResponse);
}
