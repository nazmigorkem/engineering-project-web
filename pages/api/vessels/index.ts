// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { baseURL, Vessels } from '../../../util/type';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Vessels>) {
	const backendResponse = await (await fetch(`${baseURL}/vessels`)).json();
	res.send(backendResponse);
}