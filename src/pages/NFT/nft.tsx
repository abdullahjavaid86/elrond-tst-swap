import {
  Account,
  Address,
  Balance,
  ChainID,
  GasLimit,
  GasPrice,
  NetworkConfig,
  Nonce,
  ProxyProvider,
  Transaction,
  TransactionPayload,
  TransactionVersion,
  UserSecretKey,
  UserSigner
} from '@elrondnetwork/erdjs/out';
import { BASE_URL, contractAddress } from 'config';
import { Card, Col, Row } from 'react-bootstrap';
import React, { ReactElement } from 'react';
import {
  transactionServices,
  useGetAccountInfo
} from '@elrondnetwork/dapp-core';

import { NFTArray } from 'apiRequests/nfts';

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
  const { publicKey, address } = useGetAccountInfo();

  const sendTransaction = async () => {
    const signer = new UserSigner(UserSecretKey.fromString(publicKey));
    console.log('signer: ', signer);

    const provider = new ProxyProvider(BASE_URL, { timeout: 6000 });
    console.log('provider: ', provider);

    const account = new Account(new Address());
    console.log('account: ', account);

    try {
      await NetworkConfig.getDefault().sync(provider);
      console.log(NetworkConfig.getDefault().MinGasPrice);
      console.log(NetworkConfig.getDefault().ChainID);
    } catch (error) {
      console.info(error);
    }

    // Transaction object
    const transaction = new Transaction({
      version: new TransactionVersion(1),
      nonce: new Nonce(account.nonce.valueOf()),
      data: new TransactionPayload('helloWorld'),
      gasPrice: new GasPrice(NetworkConfig.getDefault().MinGasPrice.valueOf()),
      gasLimit: new GasLimit(70_000),
      receiver: new Address(address),
      sender: new Address(contractAddress),
      value: Balance.egld(0.12),
      chainID: new ChainID(NetworkConfig.getDefault().ChainID.valueOf())
    });

    //sign the transaction
    await signer.sign(transaction);

    // make transaction
    const transactionHash = await transaction.send(provider);

    console.log(JSON.stringify(transactionHash, null, 4));
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
