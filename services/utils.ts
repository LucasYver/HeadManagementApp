import { Wallet } from '../types/';

export const getLastBallance = (wallets: Array<Wallet>) =>
  wallets.length > 0 ? wallets[0]?.value : 0;
