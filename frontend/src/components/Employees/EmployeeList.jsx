import { Table, Button, Popconfirm, message, Card } from 'antd';
import { DeleteOutlined, TeamOutlined } from '@ant-design/icons';
import { employeeAPI } from '../../services/api';
import EmptyState from '../Common/EmptyState';

const EmployeeList = ({ employees, loading, onEmployeeDeleted }) => {
  const handleDelete = async (employeeId) => {
    try {
      await employeeAPI.delete(employeeId);
      message.success('Employee deleted successfully!');
      onEmployeeDeleted();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Failed to delete employee';
      message.error(errorMsg);
    }
  };

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
      sorter: (a, b) => a.employee_id.localeCompare(b.employee_id),
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Delete Employee"
          description="Are you sure you want to delete this employee?"
          onConfirm={() => handleDelete(record.employee_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Card 
      title={
        <span>
          <TeamOutlined style={{ marginRight: 8 }} />
          Employee List ({employees.length})
        </span>
      }
    >
      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        loading={loading}
        locale={{
          emptyText: <EmptyState description="No employees found. Add your first employee above." />
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} employees`,
        }}
      />
    </Card>
  );
};

export default EmployeeList;
