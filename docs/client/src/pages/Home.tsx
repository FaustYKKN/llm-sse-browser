import { Typography } from 'antd';
import ParticlesBackground from '../components/ParticlesBackground';

export default function Home() {
  return (
    <div style={{ position: 'relative', minHeight: 300 }}>
      <ParticlesBackground />
      <div style={{ position: 'relative', padding: '80px 0', textAlign: 'center', color: '#fff' }}>
        <Typography.Title style={{ color: '#fff' }}>LLM SSE 浏览器</Typography.Title>
        <Typography.Paragraph style={{ color: '#fff' }}>
          本站演示在浏览器中消费 LLM 流式响应的相关工具。
        </Typography.Paragraph>
      </div>
    </div>
  );
}
