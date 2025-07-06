import React, { useState } from 'react';
import { Typography, Radio, Button } from 'antd';

interface Question {
  id: number;
  question: string;
  options: Record<string, string>;
  answer: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    options: { A: '2', B: '3', C: '4', D: '5' },
    answer: 'C'
  },
  {
    id: 2,
    question: 'Capital of France?',
    options: { A: 'Berlin', B: 'London', C: 'Paris', D: 'Rome' },
    answer: 'C'
  }
];

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const submit = () => {
    let sc = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) sc++;
    });
    setScore(sc);
  };

  return (
    <>
      <Typography.Title level={2}>Quiz</Typography.Title>
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
        Submit
      </Button>
      {score !== null && (
        <Typography.Paragraph>Your score: {score} / {questions.length}</Typography.Paragraph>
      )}
    </>
  );
}
