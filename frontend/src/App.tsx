import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { TasksLayout } from './components/Tasks/TasksLayout'


function App() {
  return (
    <Layout style={{height: '100vh'}}>
      <Header><h1 className='TaskTrackerTitle'>Task Tracker App</h1></Header>
      <Layout>
        <Content>
          <TasksLayout />
        </Content>
      </Layout>
      <Footer>By Juan Camilo Ramírez - 2025</Footer>
    </Layout>
  )
}

export default App
