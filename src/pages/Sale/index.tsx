import React from 'react';
import { dAppName } from 'config';

export const TSTSale = (): React.ReactElement => (
  <div className='d-flex flex-fill align-items-center container'>
    <div className='row w-100'>
      <div className='col-12 col-md-8 col-lg-5 mx-auto'>
        <div className='card shadow-sm rounded p-4 border-0'>
          <div className='card-body text-center'>
            <h2 className='mb-3' data-testid='title'>
              {dAppName}
            </h2>
            <p className='mb-3'>
              This is an Elrond dapp sample.
              <br /> Under Construction TST Public Sale :)
            </p>
            Tokens
          </div>
        </div>
      </div>
    </div>
  </div>
);
