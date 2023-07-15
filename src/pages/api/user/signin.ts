import { NextApiRequest, NextApiResponse } from 'next/types';
import bcrypt from 'bcrypt';
import { prisma } from '~/lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    await handlePost(res, req);
  } else {
    throw new Error(`The HTTP ${req.method} is not supported on this route`);
  }
}

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

async function handlePost(res: NextApiResponse, req: NextApiRequest) {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  });
  const password = await hashPassword(req.body.password);
  if (user && user.password === password) {
    res.json(user);
  } else {
    res.status(400).end('Invalid credentials');
  }
}
