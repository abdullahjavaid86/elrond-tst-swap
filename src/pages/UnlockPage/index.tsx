import { DappUI, useGetLoginInfo } from '@elrondnetwork/dapp-core';

import { Link } from 'react-router-dom';
import React from 'react';
import { routeNames } from 'routes';

export const UnlockRoute: () => JSX.Element = () => {
  const { ExtensionLoginButton, WebWalletLoginButton } = DappUI;
  const { isLoggedIn } = useGetLoginInfo();

  return (
    <div className='home d-flex flex-fill align-items-center'>
      <div className='m-auto' data-testid='unlockPage'>
        <div className='card my-4 text-center'>
          <div className='card-body py-4 px-2 px-sm-2 mx-lg-4'>
            <h4 className='mb-4'>{isLoggedIn ? 'Functions' : 'Login'}</h4>
            <p className='mb-4'>
              {isLoggedIn ? 'What you wanna do?' : 'pick a login method'}
            </p>

            {isLoggedIn ? (
              <>
                <Link to={routeNames.nft} className='btn btn-primary mr-4'>
                  Swap your NFTs
                </Link>
                <Link to={routeNames.sale} className='btn btn-primary mr-4'>
                  TST Public Sale
                </Link>
              </>
            ) : (
              <>
                <ExtensionLoginButton
                  callbackRoute={routeNames.dashboard}
                  loginButtonText={'Extension'}
                />
                <WebWalletLoginButton
                  callbackRoute={routeNames.dashboard}
                  loginButtonText={'Connect wallet'}
                />
              </>
            )}

            <Link to={routeNames.info} className='btn btn-info'>
              Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
