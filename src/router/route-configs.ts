import { FC } from 'react';
import paths from './paths';
import Login from '../pages/login';
import Home from '../pages/home';
import IdeaDetails from '../pages/idea-details';
import { Middleware, needsAuth, noAuthNeeded, needsRole } from './middleware';

export type Route = {
  path: string;
  component: FC<any>;
  exact?: boolean;
  middleware: Array<Middleware>;
};

const routes: Array<Route> = [
  {
    path: paths.login,
    component: Login,
    middleware: [noAuthNeeded],
  },
  {
    path: paths.home,
    component: Home,
    middleware: [needsAuth],
  },
  {
    path: paths.ideaDetails,
    component: IdeaDetails,
    middleware: [],
  },
  {
    path: '*',
    component: Home,
    middleware: [needsAuth],
  },
];

export default routes;
