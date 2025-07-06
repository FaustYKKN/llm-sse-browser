import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { CopyOutlined, CodeOutlined } from '@ant-design/icons';

export default function ExampleCard({ children, code }: { children: React.ReactNode; code: string }) {
  const [open, setOpen] = useState(false);
  const copy = () => navigator.clipboard.writeText(code);

  return (
    <Card style={{ marginBottom: 24 }}>
      {children}
      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Button type="link" icon={<CodeOutlined />} onClick={() => setOpen(!open)}>
          {open ? 'Hide code' : 'Show code'}
        </Button>
        <Button type="link" icon={<CopyOutlined />} onClick={copy}>
          Copy
        </Button>
      </div>
      {open && (
        <pre style={{ background: '#f7f7f7', padding: 12, marginTop: 16 }}>
          <code>{code}</code>
        </pre>
      )}
    </Card>
  );
}
