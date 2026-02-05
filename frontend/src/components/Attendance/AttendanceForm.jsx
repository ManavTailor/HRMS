import { useState } from 'react';
import { Form, Select, DatePicker, Radio, Button, Card, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { attendanceAPI } from '../../services/api';
import dayjs from 'dayjs';

const AttendanceForm = ({ employees, onAttendanceMarked }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const data = {
        employee_id: values.employee_id,
        date: values.date.format('YYYY-MM-DD'),
        status: values.status,
      };
      
      await attendanceAPI.create(data);
      message.success('Attendance marked successfully!');
      form.resetFields();
      onAttendanceMarked();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Failed to mark attendance';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      title={
        <span>
          <CheckCircleOutlined style={{ marginRight: 8 }} />
          Mark Attendance
        </span>
      }
      style={{ marginBottom: 24 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          date: dayjs(),
          status: 'Present'
        }}
      >
        <Form.Item
          label="Select Employee"
          name="employee_id"
          rules={[{ required: true, message: 'Please select an employee' }]}
        >
          <Select
            placeholder="Choose an employee"
            showSearch
            optionFilterProp="children"
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
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Radio.Group>
            <Radio value="Present">Present</Radio>
            <Radio value="Absent">Absent</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Mark Attendance
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AttendanceForm;
