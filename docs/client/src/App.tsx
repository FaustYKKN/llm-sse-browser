import React from 'react';
import { ConfigProvider, Layout, Menu, theme, Anchor, Card } from 'antd';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Examples from './pages/Examples';
import Quiz from './pages/Quiz';
import QuestionBank from './pages/QuestionBank';

const { Header, Sider, Content } = Layout;

function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();
  const isHome = location.pathname === '/';
  const anchorItems = location.pathname === '/examples' ? [
    { key: 'basic', href: '#basic', title: '基础用法' },
    { key: 'custom-speed', href: '#custom-speed', title: '自定义速度' },
    { key: 'multi-call', href: '#multi-call', title: '多次调用' }
  ] : [];

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#fff', fontSize: 18 }}>LLM SSE 文档</span>
        </Header>
        <Layout>
          {!isHome && (
            <Sider width={200} theme="dark">
              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                onClick={e => navigate(e.key)}
                items={[
                  { label: '主页', key: '/' },
                  { label: '示例', key: '/examples' },
                  { label: '测验', key: '/quiz' },
                  { label: '题库', key: '/bank' }
                ]}
              />
            </Sider>
          )}
          <Layout>
            <Content style={{ padding: 24 }}>
              {isHome ? (
                <Home />
              ) : (
                <Card style={{ background: token.colorBgContainer }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/examples" element={<Examples />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/bank" element={<QuestionBank />} />
                  </Routes>
                  </Card>
              )}
            </Content>
          </Layout>
          {anchorItems.length > 0 && !isHome && (
            <Sider width={200} theme="dark" style={{ padding: '16px 0' }}>
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
