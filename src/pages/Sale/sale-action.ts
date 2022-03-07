import {
  Account,
  Address,
  Balance,
  BytesValue,
  ChainID,
  Code,
  ContractFunction,
  GasLimit,
  GasPrice,
  NetworkConfig,
  Nonce,
  ProxyProvider,
  SmartContract,
  Transaction,
  TransactionPayload,
  TransactionVersion,
  U8Value,
  UserSecretKey,
  UserSigner
} from '@elrondnetwork/erdjs/out';
import { BASE_URL, contractAddress } from 'config';
import { ChangeEvent, FormEvent, useState } from 'react';

import BigNumber from 'bignumber.js';
import axios from 'axios';
import { getTotalPriceForTst } from 'helpers/functions';
import { strToHex } from 'pages/Dashboard/helpers/convert-to-hex';
import { useGetAccountInfo } from '@elrondnetwork/dapp-core';

export const useSaleActions = (value = 0) => {
  const { publicKey, address } = useGetAccountInfo();
  const [tstToSwap, setTstToSwap] = useState<number>(value);
  const [egldToSwap, setEGLDToSwap] = useState<number>(value);

  const onEgldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEGLDToSwap(getTotalPriceForTst(+e.target.value));
    setTstToSwap(+e.target.value);
  };

  const sendTransaction = async (e: FormEvent) => {
    e.preventDefault();

    const signer = new UserSigner(UserSecretKey.fromString(publicKey));
    const provider = new ProxyProvider(BASE_URL, { timeout: 6000 });
    const account = new Account(new Address());

    try {
      await NetworkConfig.getDefault().sync(provider);
    } catch (error) {
      console.info(error);
    }

    //Should be something like this:
    const contract = new SmartContract({
      address: new Address(contractAddress)
    });
    const transaction = contract.call({
      value: Balance.egld(egldToSwap),
      func: new ContractFunction('issue'),
      args: [BytesValue.fromUTF8('Touch Social'), BytesValue.fromUTF8('TST')],
      gasLimit: NetworkConfig.getDefault().MinGasLimit,
      receiver: new Address(address)
    });

    // make transaction
    try {
      await signer.sign(transaction);

      const hash = await provider.sendTransaction(transaction);

      console.log(`https://devnet-explorer.elrond.com/transactions/${hash}`);
      await transaction.awaitPending(provider);
      // debugger;
      // const transactionHash = await transaction.send(provider);

      console.log(hash, null, 4);
    } catch (err) {
      console.error(err);
      console.error(err?.response?.data?.message);
    }
  };

  return {
    egldToSwap,
    onEgldChange,
    sendTransaction,
    tstToSwap
  };
};
