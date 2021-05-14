import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApiBuilder } from '../../services/api-builder';
import { History } from '../../types/History';

const offset = 16;

type FetchPlatformHistoryArgs = { unit: string; platformId: number };

export const fetchPlatformHistory = createAsyncThunk<History[], FetchPlatformHistoryArgs>(
  'fetch/platformHistory',
  async ({ unit, platformId }, thunkAPI) =>
    ApiBuilder.getInstance(thunkAPI)
      .apiEndpoint(`/platforms/balance/history/${platformId}`)
      .withQueryParams({
        offset,
        unit: thunkAPI.getState().history.unit,
        intrinsic: thunkAPI.getState().history.intrinsic,
      })
      .build(),
);

export interface PlatformHistorySliceState {
  histories: History[];
  unit: string;
  intrinsic: boolean;
}

const initialState: PlatformHistorySliceState = {
  histories: [],
  unit: 'week',
  intrinsic: false,
};

export const platformHistorySlice = createSlice({
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
    builder.addCase(fetchPlatformHistory.fulfilled, (state, { payload }) => {
      state.histories = payload;
    });
  },
});

export default platformHistorySlice;
