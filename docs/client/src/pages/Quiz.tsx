import React, { useEffect, useState } from 'react';
import { Typography, Radio, Button } from 'antd';
import { basePath } from '../config';

interface Question {
  id: number;
  question: string;
  options: Record<string, string>;
  answer: string;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${basePath}/api/questions`)
      .then(res => res.json())
      .then(rows =>
        setQuestions(
          rows.map((r: any) => ({
            id: r.id,
            question: r.question,
            options: { A: r.A, B: r.B, C: r.C, D: r.D },
            answer: r.answer,
          }))
        )
      );
  }, []);

  const submit = () => {
    let sc = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) sc++;
    });
    setScore(sc);
    fetch(`${basePath}/api/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: sc, total: questions.length })
    });
  };

  return (
    <>
      <Typography.Title level={2}>测验</Typography.Title>
      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: 24 }}>
          <Typography.Paragraph>{`${q.id}. ${q.question}`}</Typography.Paragraph>
          <Radio.Group
            onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })}
            value={answers[q.id]}
          >
            {Object.entries(q.options).map(([k, v]) => (
              <Radio key={k} value={k} style={{ display: 'block', height: 24 }}>
                {`${k}. ${v}`}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      ))}
      <Button type="primary" onClick={submit} style={{ marginBottom: 16 }}>
        提交
      </Button>
      {score !== null && (
        <Typography.Paragraph>
          你的得分: {score} / {questions.length}
        </Typography.Paragraph>
      )}
    </>
  );
}
