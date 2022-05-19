import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { Middleware, Action } from './middleware';

type ProtectedPathProps = {
  middleware: Array<Middleware>;
};

const ProtectedRoute: FC<ProtectedPathProps> = (props) => {
  const { middleware, children } = props;

  let finalProps = props;

  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];

    const routingResponse = currentMiddleware(finalProps);

    if (routingResponse.action === Action.PASS) {
      finalProps = routingResponse.data || finalProps;
    }

    if (routingResponse.action === Action.REDIRECT) {
      const { redirectPath } = routingResponse.data;
      return <Navigate to={redirectPath} />;
    }
  }

  return <>{children}</>;
};

ProtectedRoute.defaultProps = {
  middleware: [],
};

export default ProtectedRoute;
