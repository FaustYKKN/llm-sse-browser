import React, { useEffect, useState } from 'react';
import { Typography, Table } from 'antd';

interface Result {
  id: number;
  created_at: string;
  score: number;
  total: number;
}

export default function Results() {
  const [data, setData] = useState<Result[]>([]);

  useEffect(() => {
    fetch('/api/results')
      .then(res => res.json())
      .then(rows => setData(rows));
  }, []);

  const columns = [
    { title: '编号', dataIndex: 'id' },
    { title: '时间', dataIndex: 'created_at' },
    {
      title: '得分',
      render: (_: any, record: Result) => `${record.score} / ${record.total}`,
    },
  ];

  return (
    <>
      <Typography.Title level={2}>答题记录</Typography.Title>
      <Table
        columns={columns}
        dataSource={data.map(r => ({ ...r, key: r.id }))}
        pagination={false}
      />
    </>
  );
}
