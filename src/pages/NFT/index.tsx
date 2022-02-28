import { NFTData, getNFts } from 'apiRequests/nfts';
import React, { useEffect, useState } from 'react';

import { NFTComponent } from './nft';
import { dAppName } from 'config';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';

export const NFTs = (): React.ReactElement => {
  const { address } = useGetAccountInfo();
  const [nfts, setNfts] = useState<NFTData>();
  const getNftsData = async () => {
    const data = await getNFts({ address });
    setNfts(data);
  };

  useEffect(() => {
    getNftsData();
  }, []);

  return (
    <div className='d-flex flex-fill align-items-center container'>
      <div className='row w-100'>
        <div className='col-12 col-md-8 col-lg-12 mx-auto'>
          <div className='card shadow-sm rounded p-4 border-0'>
            <div className='card-body text-center'>
              <h2 className='mb-3' data-testid='title'>
                {dAppName}
              </h2>
              <p className='mb-3'>This is an Elrond dapp sample.</p>
              <NFTComponent nfts={nfts?.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
