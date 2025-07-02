# LLM SSE ブラウザ

本プロジェクトは、一般的なLLMのストリーミングレスポンスを解析し、タイプライター風に表示するための小さなユーティリティを提供します。

## 使い方

```javascript
import { streamLLM, Typewriter } from './src/llmStream.js';

const el = document.getElementById('output');
const typewriter = new Typewriter(el, 30);

streamLLM('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'こんにちは' })
}, {
  onToken(token) {
    typewriter.print(token);
  },
  onDone() {
    console.log('ストリームが終了しました');
  }
});
```

Node.js で利用する場合は、`package.json` に `"type": "module"` を追加して
`*.js` を ES モジュールとして扱うか、動的な `import()` を使用してください。

## API ドキュメント

### `streamLLM(url, fetchOptions, handlers)`

指定した `url` からSSEストリームを取得します。`fetchOptions` は `fetch` のオプションと同じ形式です。`handlers` には以下のコールバックを指定します。

- `onToken(token)`：新しいトークンを受け取った際に実行されます。
- `onDone()`：`[DONE]` を受信するか接続が切断されたときに実行されます。

### `class Typewriter`

`new Typewriter(element, typingSpeed = 20)` でインスタンスを生成します。

- `element`：テキストを表示するDOM要素。
- `typingSpeed`：1文字を表示する間隔（ミリ秒）。
- `print(text)`：テキストをキューに追加し、順次表示します。

### `class LLMStreamParser`

SSEデータを処理する内部パーサーです。通常は直接使用する必要はありません。

- `new LLMStreamParser({ onMessage, onDone })`
  - `onMessage(payload)`：JSONデータを受信したときに実行。
  - `onDone()`：`[DONE]` を受信したときに実行。
- `feed(text)`：データチャンクをパーサーに渡します。

他の言語版として `readme_zh.md` と `readme_ru.md` があります。
