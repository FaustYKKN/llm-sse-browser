# LLM SSE 浏览器

该项目提供了一个帮助解析大型语言模型(LLM)常见流式响应的通用工具，并配有打字机式文本输出效果。

## 快速开始

```javascript
import { streamLLM, Typewriter } from './src/llmStream.js';

const el = document.getElementById('output');
const typewriter = new Typewriter(el, 30);

streamLLM('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: '你好' })
}, {
  onToken(token) {
    typewriter.print(token);
  },
  onDone() {
    console.log('流式传输结束');
  }
});
```

## API 说明

### `streamLLM(url, fetchOptions, handlers)`

从给定的 `url` 拉取 SSE 流，`fetchOptions` 与 `fetch` 接口保持一致。`handlers` 包含：

- `onToken(token)`：当解析到新的文本片段时回调。
- `onDone()`：当服务端发送 `[DONE]` 或连接结束时触发。

### `class Typewriter`

构造函数 `new Typewriter(element, typingSpeed = 20)` 创建一个打字机实例。

- `element`：用来展示文本的 DOM 元素。
- `typingSpeed`：每个字符的输出间隔，单位毫秒。
- `print(text)`：将文本加入输出队列并逐字展示。

### `class LLMStreamParser`

内部解析器，用于处理 SSE 数据块。通常无需直接使用。

- `new LLMStreamParser({ onMessage, onDone })`
  - `onMessage(payload)`：当收到 JSON 数据时触发。
  - `onDone()`：当收到 `[DONE]` 标记时触发。
- `feed(text)`：向解析器输入数据片段。

更多语言版本请参阅 `readme_ja.md` 与 `readme_ru.md`。
