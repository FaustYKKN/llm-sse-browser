const express = require('express');
const cors = require('cors');
const { createServer: createViteServer } = require('vite');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbFile = path.resolve(__dirname, 'questions.db');

async function start() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const db = new sqlite3.Database(dbFile);
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      A TEXT,
      B TEXT,
      C TEXT,
      D TEXT,
      answer TEXT
    )`);
  });

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

  app.get('/api/questions', (req, res) => {
    db.all('SELECT * FROM questions', (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });

  app.post('/api/questions', (req, res) => {
    const qs = req.body.questions || [];
    const stmt = db.prepare('INSERT INTO questions(question,A,B,C,D,answer) VALUES (?,?,?,?,?,?)');
    db.serialize(() => {
      for (const q of qs) {
        stmt.run(q.question, q.A, q.B, q.C, q.D, q.answer);
      }
      stmt.finalize(err => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ ok: true });
      });
    });
  });

  app.put('/api/questions/:id', (req, res) => {
    const id = req.params.id;
    const q = req.body;
    db.run(
      'UPDATE questions SET question=?,A=?,B=?,C=?,D=?,answer=? WHERE id=?',
      [q.question, q.A, q.B, q.C, q.D, q.answer, id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ ok: true });
      }
    );
  });

  app.delete('/api/questions/:id', (req, res) => {
    db.run('DELETE FROM questions WHERE id=?', req.params.id, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ok: true });
    });
  });

  const vite = await createViteServer({
    root: path.resolve(__dirname, 'client'),
    server: { middlewareMode: 'html' },
  });

  app.use(vite.middlewares);

  const port = 3000;
  app.listen(port, () => {
    console.log(`docs running at http://localhost:${port}`);
  });
}

start();
