import { Button, Card } from 'antd';
import React, { useRef } from 'react';
import { streamLLM, Typewriter } from '../../../src/llmStream.js';

export default function Basic() {
  const ref = useRef<HTMLDivElement>(null);

  const onClick = () => {
    if (!ref.current) return;
    ref.current.textContent = '';
    const writer = new Typewriter(ref.current, 30);
    streamLLM('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Hello world from demo' })
    }, {
      onToken: t => writer.print(t)
    });
  };

  return (
    <Card style={{ marginBottom: 24 }}>
      <Button type="primary" onClick={onClick}>Start</Button>
      <div ref={ref} style={{ marginTop: 16, minHeight: 24 }}></div>
    </Card>
  );
}
