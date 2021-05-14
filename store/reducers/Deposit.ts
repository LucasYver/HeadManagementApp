import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiBuilder, HttpVerbs } from '../../services/api-builder';
import { Deposit } from '../../types/';

type CreateDepositArgs = { value: number; platformId: number };

export const createDeposit = createAsyncThunk<Deposit, CreateDepositArgs>(
  'create/deposit',
  async ({ value, platformId }, thunkAPI) =>
    ApiBuilder.getInstance(thunkAPI)
      .apiEndpoint(`/platforms/${platformId}/deposits`)
      .verb(HttpVerbs.POST)
      .withBody({ value })
      .build(),
);

type DeleteDepositArgs = { id: number; platformId: number };

export const deleteDeposit = createAsyncThunk<DeleteDepositArgs, DeleteDepositArgs>(
  'delete/deposit',
  async ({ id, platformId }, thunkAPI) => {
    ApiBuilder.getInstance(thunkAPI)
      .apiEndpoint(`/platforms/${platformId}/deposits/${id}`)
      .verb(HttpVerbs.DELETE)
      .build();
    return { id, platformId };
  },
);
