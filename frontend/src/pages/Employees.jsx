import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import EmployeeForm from '../components/Employees/EmployeeForm';
import EmployeeList from '../components/Employees/EmployeeList';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';
import { employeeAPI } from '../services/api';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <EmployeeForm onEmployeeAdded={fetchEmployees} />
        </Col>
        <Col xs={24} lg={16}>
          {loading && employees.length === 0 ? (
            <Loading tip="Loading employees..." />
          ) : (
            <EmployeeList 
              employees={employees} 
              loading={loading}
              onEmployeeDeleted={fetchEmployees} 
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Employees;
