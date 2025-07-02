import { Layout, Typography } from 'antd';
import Basic from './examples/Basic';
import CustomSpeed from './examples/CustomSpeed';
import MultiCall from './examples/MultiCall';

const { Header, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Header style={{ color: '#fff' }}>LLM SSE Demo</Header>
      <Content style={{ padding: 24 }}>
        <Typography.Title level={2}>Basic</Typography.Title>
        <Basic />
        <Typography.Title level={2}>Custom Speed</Typography.Title>
        <CustomSpeed />
        <Typography.Title level={2}>Multiple Calls</Typography.Title>
        <MultiCall />
      </Content>
    </Layout>
  );
}
