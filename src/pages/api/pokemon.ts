import openai from '@/openai-config';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const completion = await openai.createCompletion({
    model: `text-davinci-003`,
    prompt: `What is the height of Charizard in metric units ?`,
  });

  const result = completion.data.choices[0].text;

  res.status(200).json({ result });
}
