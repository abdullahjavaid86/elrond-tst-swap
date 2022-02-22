import '@elrondnetwork/dapp-core/build/index.css';

import { DappProvider, DappUI } from '@elrondnetwork/dapp-core';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes, { routeNames } from 'routes';

import Layout from 'components/Layout';
import PageNotFound from 'pages/PageNotFound';
import React from 'react';
import UnlockRoute from 'pages/UnlockPage';
import { environment } from 'config';

const { TransactionsToastList, SignTransactionsModals, NotificationModal } =
  DappUI;

const App = () => (
  <Router>
    <DappProvider
      environment={environment}
      customNetworkConfig={{ name: 'customConfig', apiTimeout: 6000 }}
      completedTransactionsDelay={200}
    >
      <Layout>
        <TransactionsToastList />
        <NotificationModal />
        <SignTransactionsModals className='custom-class-for-modals' />
        <Routes>
          <Route path={routeNames.unlock} element={<UnlockRoute />} />
          {routes.map((route: any, index: number) => (
            <Route
              path={route.path}
              key={`route-key-${index}`}
              element={<route.component />}
            />
          ))}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout>
    </DappProvider>
  </Router>
);

export default App;
