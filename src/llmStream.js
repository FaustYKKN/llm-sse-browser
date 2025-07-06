export class LLMStreamParser {
  constructor({ onMessage, onDone } = {}) {
    this.onMessage = onMessage;
    this.onDone = onDone;
    this.buffer = '';
  }

  feed(text) {
    this.buffer += text;
    const eventDelimiter = '\n\n';
    let index;
    while ((index = this.buffer.indexOf(eventDelimiter)) !== -1) {
      const event = this.buffer.slice(0, index).trim();
      this.buffer = this.buffer.slice(index + eventDelimiter.length);
      if (!event) continue;
      for (const line of event.split('\n')) {
        if (line.startsWith('data:')) {
          const data = line.slice('data:'.length).trim();
          if (data === '[DONE]') {
            this.onDone && this.onDone();
            continue;
          }
          try {
            const payload = JSON.parse(data);
            this.onMessage && this.onMessage(payload);
          } catch (e) {
            // ignore malformed JSON
          }
        }
      }
    }
  }
}

export class Typewriter {
  constructor(element, typingSpeed = 20) {
    this.el = element;
    this.speed = typingSpeed;
    this.queue = [];
    this.running = false;
  }

  async _type(text) {
    for (const char of text) {
      this.el.textContent += char;
      await new Promise(r => setTimeout(r, this.speed));
    }
  }

  async _run() {
    this.running = true;
    while (this.queue.length) {
      const text = this.queue.shift();
      await this._type(text);
    }
    this.running = false;
  }

  print(text) {
    this.queue.push(text);
    if (!this.running) {
      this._run();
    }
  }
}

export async function streamLLM(url, fetchOptions, { onToken, onDone } = {}) {
  const res = await fetch(url, fetchOptions);
  const reader = res.body.getReader();
  const decoder = new TextDecoder('utf-8');
  const parser = new LLMStreamParser({
    onMessage: msg => {
      const token = msg.choices?.[0]?.delta?.content;
      if (token) onToken && onToken(token);
    },
    onDone
  });

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    parser.feed(chunk);
  }
}
