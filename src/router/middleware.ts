import { hasToken } from '../service/auth';
import paths from './paths';

export enum Action {
  PASS = 'pass',
  REDIRECT = 'redirect',
}

type RoutingResponse = {
  action: Action;
  data: any;
  redirectPath?: string;
};

export type Middleware = (route: any) => RoutingResponse;

function generateRoutingResponse(
  action: Action,
  data: Partial<RoutingResponse>,
): RoutingResponse {
  return { action, data };
}

export function needsAuth(route: any): RoutingResponse {
  if (hasToken()) {
    return generateRoutingResponse(Action.PASS, route);
  }

  return generateRoutingResponse(Action.REDIRECT, {
    redirectPath: paths.login,
  });
}

export function noAuthNeeded(route: any): RoutingResponse {
  if (hasToken()) {
    return generateRoutingResponse(Action.REDIRECT, {
      redirectPath: paths.home,
    });
  }

  return generateRoutingResponse(Action.PASS, route);
}
