import { useState } from 'react';
import { Table, Select, Card, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import EmptyState from '../Common/EmptyState';
import dayjs from 'dayjs';

const AttendanceList = ({ employees, attendanceRecords, loading }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredRecords = selectedEmployee
    ? attendanceRecords.filter(record => record.employee_id === selectedEmployee)
    : attendanceRecords;

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employee_id',
      key: 'employee_id',
      sorter: (a, b) => a.employee_id.localeCompare(b.employee_id),
    },
    {
      title: 'Employee Name',
      key: 'employee_name',
      render: (_, record) => {
        const employee = employees.find(emp => emp.employee_id === record.employee_id);
        return employee ? employee.full_name : 'Unknown';
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
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
      filters: [
        { text: 'Present', value: 'Present' },
        { text: 'Absent', value: 'Absent' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  return (
    <Card 
      title={
        <span>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Attendance Records ({filteredRecords.length})
        </span>
      }
      extra={
        <Select
          placeholder="Filter by employee"
          style={{ width: 250 }}
          allowClear
          showSearch
          optionFilterProp="children"
          onChange={setSelectedEmployee}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {employees.map((emp) => (
            <Select.Option key={emp.employee_id} value={emp.employee_id}>
              {emp.employee_id} - {emp.full_name}
            </Select.Option>
          ))}
        </Select>
      }
    >
      <Table
        columns={columns}
        dataSource={filteredRecords}
        rowKey="id"
        loading={loading}
        locale={{
          emptyText: <EmptyState description="No attendance records found. Mark attendance above." />
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} records`,
        }}
      />
    </Card>
  );
};

export default AttendanceList;
