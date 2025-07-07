import { Button, Space } from 'antd';
import React, { useRef } from 'react';
import { streamLLM, Typewriter } from '../../../../src/llmStream.js';
import ExampleCard from '../components/ExampleCard';
import { basePath } from '../config';

const code = `import { Button, Space } from 'antd';
import React, { useRef } from 'react';
import { streamLLM, Typewriter } from '../../../../src/llmStream.js';

export default function MultiCall() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const run = (ref: React.RefObject<HTMLDivElement>, prompt: string) => {
    if (!ref.current) return;
    ref.current.textContent = '';
    const writer = new Typewriter(ref.current, 20);
    streamLLM('/lovework/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    }, {
      onToken: t => writer.print(t)
    });
  };

  return (
    <>
      <Space>
        <Button onClick={() => run(ref1, 'First message streaming')}>调用 1</Button>
        <Button onClick={() => run(ref2, 'Second message streaming')}>调用 2</Button>
      </Space>
      <div ref={ref1} style={{ marginTop: 16, minHeight: 24 }}></div>
      <div ref={ref2} style={{ marginTop: 16, minHeight: 24 }}></div>
    </>
  );
}
`;

export default function MultiCall() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const run = (ref: React.RefObject<HTMLDivElement>, prompt: string) => {
    if (!ref.current) return;
    ref.current.textContent = '';
    const writer = new Typewriter(ref.current, 20);
    streamLLM(`${basePath}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    }, {
      onToken: t => writer.print(t)
    });
  };

  return (
    <ExampleCard code={code} language="tsx">
      <Space>
        <Button onClick={() => run(ref1, 'First message streaming')}>调用 1</Button>
        <Button onClick={() => run(ref2, 'Second message streaming')}>调用 2</Button>
      </Space>
      <div ref={ref1} style={{ marginTop: 16, minHeight: 24 }}></div>
      <div ref={ref2} style={{ marginTop: 16, minHeight: 24 }}></div>
    </ExampleCard>
  );
}
