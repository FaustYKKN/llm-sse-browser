import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { CopyOutlined, CodeOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { theme } from 'antd';

export default function ExampleCard({ children, code, language = 'typescript', dark = false }: { children: React.ReactNode; code: string; language?: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const copy = () => navigator.clipboard.writeText(code);
  const { token } = theme.useToken();

  return (
    <Card style={{ marginBottom: 24, background: token.colorBgContainer }}>
      {children}
      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Button type="link" icon={<CodeOutlined />} onClick={() => setOpen(!open)}>
          {open ? '隐藏代码' : '显示代码'}
        </Button>
        <Button type="link" icon={<CopyOutlined />} onClick={copy}>
          复制
        </Button>
      </div>
      {open && (
        <div style={{ marginTop: 16 }}>
          <Editor
            height="200px"
            language={language}
            theme={dark ? 'vs-dark' : 'vs'}
            value={code}
            options={{ readOnly: true, minimap: { enabled: false }, scrollBeyondLastLine: false }}
          />
        </div>
      )}
    </Card>
  );
}
