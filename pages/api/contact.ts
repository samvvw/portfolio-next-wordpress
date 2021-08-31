import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        const response = await db.collection('contact').add(req.body);
        res.status(200).json({ id: response.id });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error 500');
    }
}
