import React, { useState, useEffect } from 'react';
import { Typography, Upload, Button, Table, Modal, Input } from 'antd';
import * as XLSX from 'xlsx';

interface Row {
  key: number;
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: string;
}

export default function QuestionBank() {
  const [data, setData] = useState<Row[]>([]);
  const [editing, setEditing] = useState<Row | null>(null);

  const load = () => {
    fetch('/api/questions')
      .then(res => res.json())
      .then(rows => setData(rows.map((r: any) => ({ key: r.id, ...r }))));
  };

  useEffect(() => {
    load();
  }, []);

  const beforeUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async e => {
      const wb = XLSX.read(e.target?.result as ArrayBuffer, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const rows = json.slice(1).map(r => ({
        question: r[0],
        A: r[1],
        B: r[2],
        C: r[3],
        D: r[4],
        answer: r[5]
      }));
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: rows })
      });
      load();
    };
    reader.readAsArrayBuffer(file);
    return false; // prevent upload
  };

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['Question', 'A', 'B', 'C', 'D', 'Answer'],
      ['谁是今天最帅的 boy?', '吴彦祖', '彭于晏', '金城武', '杨东磊', 'D']
    ]);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], {
      type: 'application/octet-stream'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  const remove = async (id: number) => {
    await fetch(`/api/questions/${id}`, { method: 'DELETE' });
    load();
  };

  const saveEdit = async () => {
    if (!editing) return;
    const { key, ...payload } = editing;
    await fetch(`/api/questions/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setEditing(null);
    load();
  };

  const columns = [
    { title: '问题', dataIndex: 'question' },
    { title: 'A', dataIndex: 'A' },
    { title: 'B', dataIndex: 'B' },
    { title: 'C', dataIndex: 'C' },
    { title: 'D', dataIndex: 'D' },
    { title: '答案', dataIndex: 'answer' },
    {
      title: '操作',
      render: (_: any, record: Row) => (
        <>
          <Button size="small" onClick={() => setEditing(record)}>编辑</Button>
          <Button size="small" danger onClick={() => remove(record.key)} style={{ marginLeft: 8 }}>删除</Button>
        </>
      )
    }
  ];

  return (
    <>
      <Typography.Title level={2}>题库</Typography.Title>
      <Upload beforeUpload={beforeUpload} showUploadList={false} accept=".xlsx">
        <Button type="primary">上传 Excel</Button>
      </Upload>
      <Button onClick={downloadTemplate} style={{ marginLeft: 16 }}>下载模板</Button>
      <Table columns={columns} dataSource={data} style={{ marginTop: 24 }} pagination={false} />
      <Modal open={!!editing} onOk={saveEdit} onCancel={() => setEditing(null)} title="编辑">
        {editing && (
          <div style={{ display: 'grid', gap: 8 }}>
            <Input value={editing.question} onChange={e => setEditing({ ...editing, question: e.target.value })} placeholder="问题" />
            <Input value={editing.A} onChange={e => setEditing({ ...editing, A: e.target.value })} placeholder="A" />
            <Input value={editing.B} onChange={e => setEditing({ ...editing, B: e.target.value })} placeholder="B" />
            <Input value={editing.C} onChange={e => setEditing({ ...editing, C: e.target.value })} placeholder="C" />
            <Input value={editing.D} onChange={e => setEditing({ ...editing, D: e.target.value })} placeholder="D" />
            <Input value={editing.answer} onChange={e => setEditing({ ...editing, answer: e.target.value })} placeholder="答案" />
          </div>
        )}
      </Modal>
    </>
  );
}
