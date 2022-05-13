import { FC } from 'react';
import paths from './paths';
import Login from '../pages/login/login';
import Home from '../pages/home/home';

export type Route = {
  path: string;
  element: FC;
  exact?: boolean;
  isProtected: boolean;
};

const routes: Array<Route> = [
  {
    path: paths.login,
    element: Login,
    isProtected: false,
  },
  {
    path: paths.home,
    element: Home,
    isProtected: true,
  },
  {
    path: '*',
    element: Home,
    isProtected: true,
  },
];

export default routes;
