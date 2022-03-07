export const strToHex = (str: string): string =>
  Buffer.from(str).toString('hex');
