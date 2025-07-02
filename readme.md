# LLM SSE Browser

This project provides a small utility for consuming typical LLM streaming
responses and rendering them with a typewriter effect.

## Usage

```javascript
import { streamLLM, Typewriter } from './src/llmStream.js';

const outputEl = document.getElementById('output');
const typewriter = new Typewriter(outputEl, 30);

streamLLM('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Hello' })
}, {
  onToken(token) {
    typewriter.print(token);
  },
  onDone() {
    console.log('stream finished');
  }
});
```

## API

### streamLLM(url, fetchOptions, handlers)
Fetch an SSE stream and handle tokens and completion callbacks.

### class Typewriter
Incrementally prints text inside a DOM element.

### class LLMStreamParser
Internal parser used by `streamLLM`.

Other languages: [中文](readme_zh.md) | [日本語](readme_ja.md) | [Русский](readme_ru.md)

## Demo

A small example project is provided in the `demo` directory. It contains a Node.js
server exposing a `/chat` SSE endpoint and a React + TypeScript frontend built
with Vite and Ant Design. The frontend showcases several examples for consuming
LLM streams.

```bash
cd demo
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to try the examples.
