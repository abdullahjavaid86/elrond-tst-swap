import { Card, Col, Row } from 'react-bootstrap';
import React, { ReactElement } from 'react';
import { refreshAccount, transactionServices } from '@elrondnetwork/dapp-core';

import { NFTArray } from 'apiRequests/nfts';
import { contractAddress } from 'config';
import { getTotalPriceForTst } from 'helpers/functions';

type NFTComponentProps = {
  nfts: NFTArray[] | undefined;
  item: NFTArray;
};

export const NFTComponent: React.FC<Omit<NFTComponentProps, 'item'>> = ({
  nfts
}) => (
  <Row>
    {nfts?.map((item, idx) => (
      <NFTItem item={item} key={idx} />
    ))}
  </Row>
);

const NFTItem: React.FC<Pick<NFTComponentProps, 'item'>> = ({
  item
}): ReactElement => {
  const { sendTransactions } = transactionServices;

  const sendTransaction = async () => {
    const pongTransaction = {
      value: getTotalPriceForTst(item.nonce),
      data: 'ping',
      receiver: contractAddress
    };
    await refreshAccount();

    sendTransactions({
      transactions: pongTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Pong transaction',
        errorMessage: 'An error has occurred during Pong',
        successMessage: 'Pong transaction successful'
      },
      redirectAfterSign: false
    });
  };

  return (
    <Col md={4} sm={12}>
      <Card>
        <Card.Header>{item.identifier}</Card.Header>
        <Card.Body>
          {item.media.slice(0, 1).map((media, key) => (
            <Card.Img src={media.thumbnailUrl} key={key} />
          ))}
          <p>{item.name}</p>
        </Card.Body>
        <Card.Footer>{item.description}</Card.Footer>
        <button
          type='button'
          className='btn btn-success'
          onClick={sendTransaction}
        >
          Swap NFT/SFT
        </button>
      </Card>
    </Col>
  );
};
