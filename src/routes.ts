import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import React from 'react';
import Transaction from './pages/Transaction';
import { dAppName } from 'config';
import withPageTitle from './components/PageTitle';

export const routeNames: Record<string, string> = {
  home: '/',
  dashboard: '/dashboard',
  transaction: '/transaction',
  unlock: '/unlock',
  ledger: '/ledger',
  walletconnect: '/walletconnect'
};

interface RoutesInterface {
  path: string;
  title: string;
  component: React.ComponentType;
  authenticatedRoute?: boolean;
  [key: string]: any;
}

const routes: RoutesInterface[] = [
  {
    path: routeNames.home,
    title: 'Home',
    component: Home
  },
  {
    path: routeNames.dashboard,
    title: 'Dashboard',
    component: Dashboard,
    authenticatedRoute: true
  },
  {
    path: routeNames.transaction,
    title: 'Transaction',
    component: Transaction
  }
];

const mappedRoutes = routes.map((route) => {
  const title = route.title
    ? `${route.title} • Elrond ${dAppName}`
    : `Elrond ${dAppName}`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth
  };
});

export default mappedRoutes;
