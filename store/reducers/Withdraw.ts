import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiBuilder, HttpVerbs } from '../../services/api-builder';
import { Withdraw } from '../../types/';

type CreateWithdrawArgs = { value: number; platformId: number };

export const createWithdraw = createAsyncThunk<Withdraw, CreateWithdrawArgs>(
  'create/withdraw',
  async ({ value, platformId }, thunkAPI) =>
    ApiBuilder.getInstance(thunkAPI)
      .apiEndpoint(`/platforms/${platformId}/withdraws`)
      .verb(HttpVerbs.POST)
      .withBody({ value })
      .build(),
);

type DeleteWithdrawArgs = { id: number; platformId: number };

export const deleteWithdraw = createAsyncThunk<DeleteWithdrawArgs, DeleteWithdrawArgs>(
  'delete/withdraw',
  async ({ id, platformId }, thunkAPI) => {
    ApiBuilder.getInstance(thunkAPI)
      .apiEndpoint(`/platforms/${platformId}/withdraws/${id}`)
      .verb(HttpVerbs.DELETE)
      .build();
    return { id, platformId };
  },
);
