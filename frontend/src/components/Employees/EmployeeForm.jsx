import { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { employeeAPI } from '../../services/api';

const EmployeeForm = ({ onEmployeeAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await employeeAPI.create(values);
      message.success('Employee added successfully!');
      form.resetFields();
      onEmployeeAdded();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || 'Failed to add employee';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      title={
        <span>
          <UserAddOutlined style={{ marginRight: 8 }} />
          Add New Employee
        </span>
      }
      style={{ marginBottom: 24 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Employee ID"
          name="employee_id"
          rules={[
            { required: true, message: 'Please enter employee ID' },
            { max: 50, message: 'Employee ID must be less than 50 characters' }
          ]}
        >
          <Input placeholder="e.g., EMP001" />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="full_name"
          rules={[
            { required: true, message: 'Please enter full name' },
            { max: 255, message: 'Name must be less than 255 characters' }
          ]}
        >
          <Input placeholder="e.g., John Doe" />
        </Form.Item>

        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            { required: true, message: 'Please enter email address' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}
        >
          <Input placeholder="e.g., john.doe@company.com" />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[
            { required: true, message: 'Please enter department' },
            { max: 100, message: 'Department must be less than 100 characters' }
          ]}
        >
          <Input placeholder="e.g., Engineering" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Employee
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EmployeeForm;
