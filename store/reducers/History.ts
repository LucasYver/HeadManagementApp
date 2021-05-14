import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApiBuilder } from '../../services/api-builder';
import { History } from '../../types/History';

const offset = 16;

export const fetchHistories = createAsyncThunk<History[]>(
  'fetch/history',
  async (payload, thunkAPI) =>
    ApiBuilder.getInstance(thunkAPI)
      .apiEndpoint(`/platforms/balance/history`)
      .withQueryParams({
        offset,
        unit: thunkAPI.getState().history.unit,
        intrinsic: thunkAPI.getState().history.intrinsic,
      })
      .build(),
);

export interface HistorySliceState {
  histories: History[];
  unit: string;
  intrinsic: boolean;
}

const initialState: HistorySliceState = {
  histories: [],
  unit: 'week',
  intrinsic: false,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setUnit: (state, { payload }: PayloadAction<string>) => {
      state.unit = payload;
    },
    setIntrinsic: (state, { payload }: PayloadAction<boolean>) => {
      state.intrinsic = !state.intrinsic;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistories.fulfilled, (state, { payload }) => {
      state.histories = payload;
    });
  },
});

export default historySlice;
