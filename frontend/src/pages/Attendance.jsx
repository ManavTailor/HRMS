import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import AttendanceForm from '../components/Attendance/AttendanceForm';
import AttendanceList from '../components/Attendance/AttendanceList';
import Loading from '../components/Common/Loading';
import ErrorMessage from '../components/Common/ErrorMessage';
import { employeeAPI, attendanceAPI } from '../services/api';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const employeesResponse = await employeeAPI.getAll();
      setEmployees(employeesResponse.data);

      // Fetch attendance for all employees
      const allAttendance = [];
      for (const emp of employeesResponse.data) {
        try {
          const attendanceResponse = await attendanceAPI.getByEmployee(emp.employee_id);
          allAttendance.push(...attendanceResponse.data);
        } catch (err) {
          console.log(`No attendance for ${emp.employee_id}`);
        }
      }
      setAttendanceRecords(allAttendance);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      
      {loading && employees.length === 0 ? (
        <Loading tip="Loading attendance data..." />
      ) : (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <AttendanceForm 
              employees={employees} 
              onAttendanceMarked={fetchData} 
            />
          </Col>
          <Col xs={24} lg={16}>
            <AttendanceList 
              employees={employees}
              attendanceRecords={attendanceRecords}
              loading={loading}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Attendance;
