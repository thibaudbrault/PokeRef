import { MdSend } from '@meronex/icons/md';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { ChatForm, ChatInput, ChatSection, ChatSubmit } from './Styled.Chat';

function Chat() {
  const [prompt, setPrompt] = useState<string>(``);
  const [result, setResult] = useState<string>(``);

  const postPrompt = async (prompt: string) => {
    try {
      const res = await axios.post(`/api/pokemon`, { prompt: prompt });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const { mutate: callPrompt } = useMutation({
    mutationFn: postPrompt,
    onError: (err) => console.error(err),
    onSuccess: (data) => setResult(data.result),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    callPrompt(prompt);
  };
  return (
    <ChatSection>
      <ChatForm onSubmit={(e) => handleSubmit(e)}>
        <ChatInput>
          {/* <label htmlFor="prompt">Quick find</label> */}
          <input
            type="text"
            name="prompt"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Find information with ChatGPT"
          />
        </ChatInput>
        <ChatSubmit>
          <MdSend />
        </ChatSubmit>
      </ChatForm>
      {result && (
        <div>
          <p>{result}</p>
          <button onClick={() => setResult(``)}>Reset</button>
        </div>
      )}
    </ChatSection>
  );
}

export default Chat;
