import { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Tag } from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  CalendarOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { employeeAPI, attendanceAPI } from '../services/api';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalAttendanceRecords: 0,
    presentToday: 0,
    absentToday: 0,
    attendanceRate: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const employeesResponse = await employeeAPI.getAll();
      const employeesData = employeesResponse.data;
      setEmployees(employeesData);

      const allAttendance = [];
      for (const emp of employeesData) {
        try {
          const attendanceResponse = await attendanceAPI.getByEmployee(emp.employee_id);
          allAttendance.push(...attendanceResponse.data);
        } catch (err) {
          console.log(`No attendance for ${emp.employee_id}`);
        }
      }
      setAttendanceRecords(allAttendance);

      calculateStats(employeesData, allAttendance);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (employeesData, attendanceData) => {
    const totalEmployees = employeesData.length;

    const departments = new Set(employeesData.map(emp => emp.department));
    const totalDepartments = departments.size;

    const totalAttendanceRecords = attendanceData.length;

    const today = new Date().toISOString().split('T')[0];

    const todayRecords = attendanceData.filter(record => record.date === today);
    const presentToday = todayRecords.filter(record => record.status === 'Present').length;
    const absentToday = todayRecords.filter(record => record.status === 'Absent').length;

    const totalPresent = attendanceData.filter(record => record.status === 'Present').length;
    const attendanceRate = totalAttendanceRecords > 0 
      ? ((totalPresent / totalAttendanceRecords) * 100).toFixed(1)
      : 0;

    setStats({
      totalEmployees,
      totalDepartments,
      totalAttendanceRecords,
      presentToday,
      absentToday,
      attendanceRate,
    });
  };

  const getDepartmentStats = () => {
    const deptMap = {};
    employees.forEach(emp => {
      deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
    });
    return Object.entries(deptMap).map(([department, count]) => ({
      department,
      count,
    }));
  };

  // Recent attendance records
  const getRecentAttendance = () => {
    return attendanceRecords
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
      .map(record => {
        const employee = employees.find(emp => emp.employee_id === record.employee_id);
        return {
          ...record,
          employeeName: employee?.full_name || 'Unknown',
        };
      });
  };

  const departmentColumns = [
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Employee Count',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
  ];

  const recentAttendanceColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Employee',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Present' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
  ];

  if (loading) {
    return <Loading tip="Loading dashboard data..." />;
  }

  return (
    <div>
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

      <h1 style={{ marginBottom: 24 }}>
        <RiseOutlined style={{ marginRight: 8 }} />
        Analytics Dashboard
      </h1>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <Statistic
              title="Total Employees"
              value={stats.totalEmployees}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <Statistic
              title="Departments"
              value={stats.totalDepartments}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <Statistic
              title="Attendance Records"
              value={stats.totalAttendanceRecords}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#13c2c2' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <Statistic
              title="Attendance Rate"
              value={stats.attendanceRate}
              suffix="%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Statistic
              title="Present Today"
              value={stats.presentToday}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <Statistic
              title="Absent Today"
              value={stats.absentToday}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Department Breakdown" bordered={false} className="hover:shadow-lg transition-shadow duration-300">
            <Table
              columns={departmentColumns}
              dataSource={getDepartmentStats()}
              rowKey="department"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Attendance" bordered={false} className="hover:shadow-lg transition-shadow duration-300">
            <Table
              columns={recentAttendanceColumns}
              dataSource={getRecentAttendance()}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
