import { Typography } from 'antd';
import Basic from '../examples/Basic';
import CustomSpeed from '../examples/CustomSpeed';
import MultiCall from '../examples/MultiCall';

export default function Examples() {
  return (
    <>
      <Typography.Title id="basic" level={2}>基础用法</Typography.Title>
      <Basic />
      <Typography.Title id="custom-speed" level={2}>自定义速度</Typography.Title>
      <CustomSpeed />
      <Typography.Title id="multi-call" level={2}>多次调用</Typography.Title>
      <MultiCall />
    </>
  );
}
