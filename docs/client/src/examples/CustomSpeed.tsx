import { Button } from 'antd';
import React, { useRef } from 'react';
import { streamLLM, Typewriter } from '../../../../src/llmStream.js';
import ExampleCard from '../components/ExampleCard';
import { basePath } from '../config';

const code = `import { Button } from 'antd';
import React, { useRef } from 'react';
import { streamLLM, Typewriter } from '../../../../src/llmStream.js';

export default function CustomSpeed() {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (!ref.current) return;
    ref.current.textContent = '';
    const writer = new Typewriter(ref.current, 5);
    streamLLM('/lovework/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Fast typing speed example' })
    }, {
      onToken: t => writer.print(t)
    });
  };

  return (
    <>
      <Button onClick={onClick}>快速开始</Button>
      <div ref={ref} style={{ marginTop: 16, minHeight: 24 }}></div>
    </>
  );
}
`;

export default function CustomSpeed() {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (!ref.current) return;
    ref.current.textContent = '';
    const writer = new Typewriter(ref.current, 5);
    streamLLM(`${basePath}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Fast typing speed example' })
    }, {
      onToken: t => writer.print(t)
    });
  };

  return (
    <ExampleCard code={code} language="tsx">
      <Button onClick={onClick}>快速开始</Button>
      <div ref={ref} style={{ marginTop: 16, minHeight: 24 }}></div>
    </ExampleCard>
  );
}
