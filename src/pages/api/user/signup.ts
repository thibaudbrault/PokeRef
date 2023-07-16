import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { prisma } from '~/lib/prisma';

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const handlePost = async (res: NextApiResponse, req: NextApiRequest) => {
  const userExists = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (userExists) {
    return res.status(409).json({
      success: false,
      message: `A user with the same email already exists`,
    });
  }
  await prisma.user.create({
    data: {
      ...req.body,
      password: await hashPassword(req.body.password),
    },
  });
  return res
    .status(201)
    .json({ success: true, message: `Account created successfuly` });
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
