import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    try {
        const verifyTokenreq = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${req.body.token}`,
            {
                method: 'post',
            }
        );

        const verifyToken = await verifyTokenreq.json();

        console.log(verifyToken);
        if (verifyToken.success) {
            const response = await db.collection('contact').add(req.body);
            res.status(200).json({ id: response.id });
        } else {
            res.status(403).json({ verifyToken: verifyToken });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error 500');
    }
}
