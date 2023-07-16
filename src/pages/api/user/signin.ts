import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { prisma } from '~/lib/prisma';

const comparePasswords = async (password: string, hashedPassword: string) => {
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  return passwordsMatch;
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
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `No user found with this email. Try with a different email`,
    });
  }
  const passwordsMatch = await comparePasswords(
    req.body.password,
    user.password,
  );
  if (passwordsMatch) {
    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user: user,
    });
  } else {
    res.status(400).end(`Invalid credentials`);
  }
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === `POST`) {
    await handlePost(res, req);
  } else {
    res.status(400).json({ success: false, message: `Invalid method` });
  }
}
