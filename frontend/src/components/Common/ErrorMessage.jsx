import { Alert } from 'antd';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <Alert
      message="Error"
      description={message}
      type="error"
      closable
      onClose={onClose}
      style={{ marginBottom: 16 }}
    />
  );
};

export default ErrorMessage;
