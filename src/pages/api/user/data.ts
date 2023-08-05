import { NextApiResponse, NextApiRequest } from 'next';

import { prisma } from '~/lib/prisma';

const handleGet = async (res: NextApiResponse, req: NextApiRequest) => {
  const { email } = req.query;
  const singleEmail = Array.isArray(email) ? email[0] : email;
  if (typeof singleEmail !== `string`) {
    return res.status(400).json({ error: `Invalid email` });
  }
  const user = await prisma.user.findUnique({
    where: { email: singleEmail },
    include: { caught: true },
  });
  if (!user) {
    return res.status(404).json({ success: false, message: `No user found` });
  }
  return res.status(200).json({ success: true, user });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === `GET`) {
    await handleGet(res, req);
  } else {
    res.status(400).json({ success: false, message: `Invalid method` });
  }
}
