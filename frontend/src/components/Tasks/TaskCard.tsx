import { Button, Col, Flex, Layout, Typography } from "antd";
import './TaskCard.css';

const { Title, Text } = Typography;

export interface TaskCardProps {
  id: string;
  name: string;
  description: string;
}

export function TaskCard(props: TaskCardProps) {
  return <Col 
    key={props.id}
    xs={{ flex: '100%' }}
    sm={{ flex: '50%' }}
    md={{ flex: '33%' }}
    lg={{ flex: '25%' }}
    xl={{ flex: '20%' }}
    >
    <Layout className="TaskCard">
      <Title level={3}>{ props.name }</Title>
      <Flex className="Content" vertical={true} gap="small">
        <Text>{ props.description }</Text>
        <Flex gap="small" >
          <Button variant="solid" color="danger">Stop</Button>
        </Flex>
      </Flex>
    </Layout>
  </Col>
}