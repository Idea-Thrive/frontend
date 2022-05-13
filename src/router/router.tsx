import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './route-configs';
import ProtectedRoute from './protected-route';

const RouterProvider: FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const { element: Component } = route;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.isProtected ? (
                  <ProtectedRoute>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default RouterProvider;
