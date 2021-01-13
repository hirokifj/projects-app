import { FC } from 'react';
import { useAuth } from '@/lib/auth';

const Dashboard: FC = () => {
  const { redirectIfUnAuthorized, isAuthorized, user } = useAuth();
  redirectIfUnAuthorized();

  if (!isAuthorized && !user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main>
        <h1>Starter</h1>
        <span>usename: {user?.name}</span>
      </main>
    </div>
  );
};

export default Dashboard;
