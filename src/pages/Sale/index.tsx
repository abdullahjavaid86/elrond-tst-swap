import React from 'react';
import { dAppName } from 'config';
import { getTotalPriceForTst } from 'helpers/functions';
import { useSaleActions } from './sale-action';

export const TSTSale = (): React.ReactElement => {
  const { tstToSwap, onEgldChange, sendTransaction } = useSaleActions();

  return (
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
                <br /> Swap your EGLD with TST:)
              </p>
              <form onSubmit={sendTransaction}>
                <label>
                  Enter TST value to swap
                  <input
                    type='number'
                    onChange={onEgldChange}
                    value={tstToSwap}
                    step='1'
                    min='0'
                  />
                </label>
                <p>You will get: {getTotalPriceForTst(tstToSwap)}</p>
                <button className='btn btn-success'>Swap</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
