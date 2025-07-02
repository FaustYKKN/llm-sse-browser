# LLM SSE Browser

Проект предоставляет небольшой набор инструментов для обработки потоковых ответов LLM и вывода текста эффектом печатной машинки.

## Быстрый старт

```javascript
import { streamLLM, Typewriter } from './src/llmStream.js';

const el = document.getElementById('output');
const typewriter = new Typewriter(el, 30);

streamLLM('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Привет' })
}, {
  onToken(token) {
    typewriter.print(token);
  },
  onDone() {
    console.log('поток завершен');
  }
});
```

## Документация API

### `streamLLM(url, fetchOptions, handlers)`

Получает SSE-поток по указанному `url`. `fetchOptions` полностью совместимы с `fetch`. В `handlers` можно передать:

- `onToken(token)` — вызывается при получении очередного фрагмента текста.
- `onDone()` — вызывается при получении `[DONE]` или закрытии соединения.

### `class Typewriter`

Конструктор `new Typewriter(element, typingSpeed = 20)` создаёт экземпляр печатной машинки.

- `element` — DOM-элемент для вывода текста.
- `typingSpeed` — задержка между символами в миллисекундах.
- `print(text)` — помещает текст в очередь и выводит его посимвольно.

### `class LLMStreamParser`

Внутренний парсер SSE. В большинстве случаев использовать его напрямую не требуется.

- `new LLMStreamParser({ onMessage, onDone })`
  - `onMessage(payload)` — вызывается при получении JSON-объекта.
  - `onDone()` — вызывается при получении `[DONE]`.
- `feed(text)` — передает данные парсеру.

Для других языков см. `readme_zh.md` и `readme_ja.md`.
