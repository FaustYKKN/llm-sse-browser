import { Typography } from 'antd';
import Basic from '../examples/Basic';
import CustomSpeed from '../examples/CustomSpeed';
import MultiCall from '../examples/MultiCall';

export default function Examples({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <Typography.Title id="basic" level={2}>Basic</Typography.Title>
      <Basic dark={dark} />
      <Typography.Title id="custom-speed" level={2}>Custom Speed</Typography.Title>
      <CustomSpeed dark={dark} />
      <Typography.Title id="multi-call" level={2}>Multiple Calls</Typography.Title>
      <MultiCall dark={dark} />
    </>
  );
}
