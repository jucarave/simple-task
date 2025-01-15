import { Button, Col, Flex, Layout, Typography } from "antd";
import './TaskCard.css';

const { Title, Text } = Typography;

export function TaskCard() {
  return <Col 
    xs={{ flex: '100%' }}
    sm={{ flex: '50%' }}
    md={{ flex: '33%' }}
    lg={{ flex: '25%' }}
    xl={{ flex: '20%' }}
    >
    <Layout className="TaskCard">
      <Title level={3}>Fourth Task</Title>
      <Flex className="Content" vertical={true} gap="small">
        <Text>The fourth task, some description goes here</Text>
        <Flex gap="small" >
          <Button variant="solid" color="danger">Stop</Button>
        </Flex>
      </Flex>
    </Layout>
  </Col>
}