import { FC } from 'react';
import { hasToken } from '../service/auth';
import { Navigate } from 'react-router-dom';

type ProtectedPathProps = {
  redirectPath?: string;
};

const ProtectedRoute: FC<ProtectedPathProps> = ({ redirectPath, children }) => {
  if (hasToken() === false) {
    return <Navigate to={redirectPath!} />;
  }

  return <>{children}</>;
};

ProtectedRoute.defaultProps = {
  redirectPath: '/login',
};

export default ProtectedRoute;
