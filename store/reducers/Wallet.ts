import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiBuilder, HttpVerbs } from '../../services/api-builder';
import { Wallet } from '../../types/';

type CreateWalletArgs = { value: number; platformId: number };

export const createWallet = createAsyncThunk<Wallet, CreateWalletArgs>(
  'create/wallet',
  async ({ value, platformId }, thunkAPI) =>
    ApiBuilder.getInstance(thunkAPI)
      .apiEndpoint(`/platforms/${platformId}/wallets`)
      .verb(HttpVerbs.POST)
      .withBody({ value })
      .build(),
);

type DeleteWalletArgs = { id: number; platformId: number };

export const deleteWallet = createAsyncThunk<DeleteWalletArgs, DeleteWalletArgs>(
  'delete/wallet',
  async ({ id, platformId }, thunkAPI) => {
    ApiBuilder.getInstance(thunkAPI)
      .apiEndpoint(`/platforms/${platformId}/wallets/${id}`)
      .verb(HttpVerbs.DELETE)
      .build();
    return { id, platformId };
  },
);
