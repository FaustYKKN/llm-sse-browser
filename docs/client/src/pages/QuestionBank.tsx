import React, { useState } from 'react';
import { Typography, Upload, Button, Table } from 'antd';
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

  const beforeUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const wb = XLSX.read(e.target?.result as ArrayBuffer, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const rows = json.slice(1).map((r, idx) => ({
        key: idx,
        question: r[0],
        A: r[1],
        B: r[2],
        C: r[3],
        D: r[4],
        answer: r[5]
      }));
      setData(rows);
    };
    reader.readAsArrayBuffer(file);
    return false; // prevent upload
  };

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([
      ['Question', 'A', 'B', 'C', 'D', 'Answer'],
      ['What is 2+2?', '1', '2', '3', '4', 'C']
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

  const columns = [
    { title: 'Question', dataIndex: 'question' },
    { title: 'A', dataIndex: 'A' },
    { title: 'B', dataIndex: 'B' },
    { title: 'C', dataIndex: 'C' },
    { title: 'D', dataIndex: 'D' },
    { title: 'Answer', dataIndex: 'answer' }
  ];

  return (
    <>
      <Typography.Title level={2}>Question Bank</Typography.Title>
      <Upload beforeUpload={beforeUpload} showUploadList={false} accept=".xlsx">
        <Button type="primary">Upload Excel</Button>
      </Upload>
      <Button onClick={downloadTemplate} style={{ marginLeft: 16 }}>Download Template</Button>
      <Table columns={columns} dataSource={data} style={{ marginTop: 24 }} pagination={false} />
    </>
  );
}
