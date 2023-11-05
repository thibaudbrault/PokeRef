import { NextApiRequest, NextApiResponse } from 'next/types';

import { prisma } from '~/lib/prisma';

const handlePost = async (res: NextApiResponse, req: NextApiRequest) => {
  const { name, image, userEmail } = req.body;
  await prisma.caught.create({
    data: {
      name: name,
      image: image,
      user: { connect: { email: userEmail } },
    },
  });
  return res.status(200).json({ success: true, message: `Pokémon caught` });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === `POST`) {
    await handlePost(res, req);
  } else {
    res.status(400).json({ success: false, message: `Invalid method` });
  }
}
