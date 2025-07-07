import { Typography, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import ParticlesBackground from '../components/ParticlesBackground';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
      <ParticlesBackground />
      <div
        style={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
        }}
      >
        <Typography.Title style={{ color: '#fff', fontSize: 48 }}>
          LLM SSE 浏览器
        </Typography.Title>
        <Typography.Paragraph style={{ color: '#fff', fontSize: 20 }}>
          在浏览器中优雅地处理流式响应
        </Typography.Paragraph>
        <Button type="primary" size="large" onClick={() => navigate('/examples')}>立即体验</Button>
      </div>
    </div>
  );
}
