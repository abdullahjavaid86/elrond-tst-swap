import React, { ChangeEvent, useState } from 'react';
import { dAppName } from 'config';
import { getTotalPriceForEGLD } from 'helpers/functions';

export const TSTSale = (): React.ReactElement => {
  const [toSwap, setSwap] = useState(0.0);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSwap(+e.target.value);
  };

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
              <form>
                <label>
                  Enter value to swap
                  <input
                    type='number'
                    onChange={onValueChange}
                    value={toSwap}
                    step='0.01'
                  />
                </label>
                <p>You will get: {getTotalPriceForEGLD(toSwap)}</p>
                <button className='btn btn-success'>Swap</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
