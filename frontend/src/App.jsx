import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import './App.css';

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Content style={{ padding: '24px 50px' }}>
          <div style={{ 
            background: '#fff', 
            padding: 24, 
            minHeight: 'calc(100vh - 134px)',
            borderRadius: '8px'
          }}>
            <Routes>
              <Route path="/" element={<Employees />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          HRMS Lite ©{new Date().getFullYear()} - Human Resource Management System
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
