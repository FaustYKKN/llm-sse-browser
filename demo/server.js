const express = require('express');
const cors = require('cors');

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

app.listen(3000, () => {
  console.log('demo server running on http://localhost:3000');
});
