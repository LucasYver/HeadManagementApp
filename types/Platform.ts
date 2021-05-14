import { Deposit, Media, Stock, Wallet, Withdraw } from './index';

export type Platform = {
  id: number;

  name: string;

  colorCode: string;

  wallets: Wallet[];

  deposits: Deposit[];

  stocks: Stock[];

  withdraws: Withdraw[];

  media: Media;
};
