import React, { useState } from 'react';
import { ConfigProvider, Layout, Menu, Switch, theme, Anchor } from 'antd';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Examples from './pages/Examples';

const { Header, Sider, Content } = Layout;

function Shell() {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const anchorItems = location.pathname === '/examples' ? [
    { key: 'basic', href: '#basic', title: 'Basic' },
    { key: 'custom-speed', href: '#custom-speed', title: 'Custom Speed' },
    { key: 'multi-call', href: '#multi-call', title: 'Multiple Calls' }
  ] : [];

  return (
    <ConfigProvider theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontSize: 18 }}>LLM SSE Docs</span>
          <Switch checked={dark} onChange={setDark} checkedChildren="🌙" unCheckedChildren="☀️" />
        </Header>
        <Layout>
          <Sider width={200} theme={dark ? 'dark' : 'light'}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              onClick={e => navigate(e.key)}
              items={[
                { label: 'Home', key: '/' },
                { label: 'Examples', key: '/examples' }
              ]}
            />
          </Sider>
          <Layout>
            <Content style={{ padding: 24 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/examples" element={<Examples dark={dark} />} />
              </Routes>
            </Content>
          </Layout>
          {anchorItems.length > 0 && (
            <Sider width={200} theme={dark ? 'dark' : 'light'} style={{ padding: '16px 0' }}>
              <Anchor items={anchorItems} />
            </Sider>
          )}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
