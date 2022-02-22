import { BASE_URL, contractAddress } from 'config';

import axios from 'axios';

interface getNftsInterface {
  address: string;
  creator?: string;
}

export const NFTs = {
  get: async ({
    address,
    creator = contractAddress
  }: getNftsInterface): Promise<NFTData> => {
    try {
      const nfts = await axios.get(`${BASE_URL}accounts/${address}/nfts`, {
        params: {
          creator
        }
      });
      const data: NFTArray[] = nfts.data.map((item: NftsResponse) => ({
        identifier: item.identifier,
        nonce: item.nonce,
        type: item.type,
        name: item.name,
        creator: item.creator,
        royalties: item.royalties,
        url: item.url,
        media: item.media,
        description: item.metadata.description
      }));
      return { data, success: data !== undefined };
    } catch (err) {
      return {
        data: [],
        err,
        success: false
      };
    }
  }
};

export const getNFts = ({ address }: getNftsInterface) => NFTs.get({ address });

export type NFTArray = {
  identifier: string;
  nonce: number;
  type: string;
  name: string;
  creator: string;
  royalties: number;
  url: string;
  media: NFTMediaResponseType[];
  description: string;
};

export type NFTData = {
  data: NFTArray[];
  success: boolean;
  err?: unknown;
};

export type NftsResponse = {
  identifier: string;
  collection: string;
  attributes: string;
  nonce: number;
  type: string;
  name: string;
  creator: string;
  royalties: number;
  uris: string[];
  url: string;
  media: NFTMediaResponseType[];
  isWhitelistedStorage: boolean;
  tags: string[];
  metadata: {
    description: string;
    [key: string]: string;
  };
  balance: string;
  ticker: string;
};

export type NFTMediaResponseType = {
  url: string;
  fileSize: number;
  fileType: string;
  originalUrl: string;
  thumbnailUrl: string;
};
