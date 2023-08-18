import { NextApiRequest, NextApiResponse } from 'next/types';

import { prisma } from '~/lib/prisma';

const handleDelete = async (res: NextApiResponse, req: NextApiRequest) => {
  const { id } = req.query;
  const singleId = Array.isArray(id) ? id[0] : id;
  if (typeof singleId !== `string`) {
    return res.status(400).json({ error: `Invalid ID` });
  }
  await prisma.caught.delete({
    where: { id: singleId },
  });
  return res.status(200).json({ success: true, message: `Pokémon released` });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === `DELETE`) {
    await handleDelete(res, req);
  } else {
    res.status(400).json({ success: false, message: `Invalid method` });
  }
}
