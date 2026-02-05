import { Empty as AntEmpty } from 'antd';

const EmptyState = ({ description = 'No data available' }) => {
  return (
    <div style={{ padding: '40px 0' }}>
      <AntEmpty description={description} />
    </div>
  );
};

export default EmptyState;
