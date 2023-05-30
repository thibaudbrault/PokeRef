import openai from '@/openai-config';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const completion = await openai.createChatCompletion({
    model: `gpt-3.5-turbo`,
    messages: [
      {
        role: `user`,
        content: req.body.prompt,
      },
    ],
  });

  const result = completion.data.choices[0].message.content;

  res.status(200).json({ result });
}
