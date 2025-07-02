const express = require('express');
const cors = require('cors');

const { createServer: createViteServer } = require('vite');
const path = require('path');

async function start() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post('/chat', (req, res) => {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    res.flushHeaders();

    const text = (req.body.prompt || 'Hello from server').split(/\s+/);
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        const payload = JSON.stringify({ choices: [{ delta: { content: text[index] + ' ' } }] });
        res.write(`data: ${payload}\n\n`);
        index++;
      } else {
        res.write('data: [DONE]\n\n');
        clearInterval(timer);
        res.end();
      }
    }, 400);
  });

  const vite = await createViteServer({
    root: path.resolve(__dirname, 'client'),
    server: { middlewareMode: 'html' },
  });

  app.use(vite.middlewares);

  const port = 3000;
  app.listen(port, () => {
    console.log(`demo running at http://localhost:${port}`);
  });
}

start();
