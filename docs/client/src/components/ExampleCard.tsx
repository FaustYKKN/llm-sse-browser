import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { CopyOutlined, CodeOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';

export default function ExampleCard({ children, code, language = 'typescript', dark = false }: { children: React.ReactNode; code: string; language?: string; dark?: boolean }) {
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
        <div style={{ marginTop: 16 }}>
          <Editor
            height="200px"
            language={language}
            theme={dark ? 'vs-dark' : 'light'}
            value={code}
            options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false }}
          />
        </div>
      )}
    </Card>
  );
}
