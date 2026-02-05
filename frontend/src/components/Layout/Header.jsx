import { Layout, Menu } from 'antd';
import { DashboardOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = () => {
  const location = useLocation();
  
  const menuItems = [
    
    {
      key: '/',
      icon: <TeamOutlined />,
      label: <Link to="/">Employees</Link>,
    },
    {
      key: '/attendance',
      icon: <CalendarOutlined />,
      label: <Link to="/attendance">Attendance</Link>,
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
  ];

  return (
    <AntHeader style={{ 
      background: '#001529', 
      padding: '0 50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div style={{ 
        color: 'white', 
        fontSize: '20px', 
        fontWeight: 'bold',
        marginRight: '50px'
      }}>
        HRMS Lite
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0 }}
      />
    </AntHeader>
  );
};

export default Header;
