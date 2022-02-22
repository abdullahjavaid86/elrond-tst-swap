export const contractAddress =
  'erd17lnuzy88xc3k4skwwch8x2ceq0rj5v7n0nerjsa54x7j5297mh5s3n7jl6';

export const getEnvironment = (): 'testnet' | 'mainnet' | 'devnet' => 'devnet';
export const environment = getEnvironment();

export const BASE_URL = `https://${
  environment !== 'mainnet' ? `${environment}-api` : 'api'
}.elrond.com/`;

export const dAppName = 'Elrond Dapp';
