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

Ensure your project treats `*.js` files as ES modules (for example by adding
`"type": "module"` to `package.json`) or use dynamic `import()` when running
under Node.js.

## API

### streamLLM(url, fetchOptions, handlers)
Fetch an SSE stream and handle tokens and completion callbacks.

### class Typewriter
Incrementally prints text inside a DOM element.

### class LLMStreamParser
Internal parser used by `streamLLM`.

Other languages: [中文](readme_zh.md) | [日本語](readme_ja.md) | [Русский](readme_ru.md)

## Docs

A small documentation site lives in the `docs` directory. It bundles a Node.js
server exposing a `/chat` SSE endpoint and a React + TypeScript frontend built
with Vite and Ant Design. The frontend demonstrates how to consume LLM streams.

```bash
cd docs
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to explore the examples and the quiz site. The site now includes a small quiz and a question bank page where you can upload Excel files or download a template to manage questions.

