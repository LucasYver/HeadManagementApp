import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ApiBuilder } from '../../services/api-builder';
import { Platform } from '../../types/index';
import { createDeposit, deleteDeposit } from './Deposit';
import { createWallet, deleteWallet } from './Wallet';
import { createWithdraw, deleteWithdraw } from './Withdraw';

const relations = 'wallets,deposits,media,withdraws';
const orders = 'wallets.date:DESC,deposits.date:DESC,withdraws.date:DESC';

export const fetchPlatforms = createAsyncThunk<Platform[]>('fetch/platform', async (thunkAPI) =>
  ApiBuilder.getInstance(thunkAPI)
    .apiEndpoint(`/platforms`)
    .withQueryParams({ relations, orders })
    .build(),
);

export interface PlatformSliceState {
  platforms: Platform[];
}

const initialState: PlatformSliceState = {
  platforms: [],
};

export const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlatforms.fulfilled, (state, { payload }) => {
      state.platforms = payload;
    });
    builder.addCase(createDeposit.fulfilled, (state, { payload }) => {
      const platforms = state.platforms.map((platform) => {
        if (platform.id === payload.platformId) {
          return { ...platform, deposits: [{ ...payload }, ...platform.deposits] };
        }
        return platform;
      });
      state.platforms = platforms;
    });
    builder.addCase(createWithdraw.fulfilled, (state, { payload }) => {
      const platforms = state.platforms.map((platform) => {
        if (platform.id === payload.platformId) {
          return { ...platform, withdraws: [{ ...payload }, ...platform.withdraws] };
        }
        return platform;
      });
      state.platforms = platforms;
    });
    builder.addCase(createWallet.fulfilled, (state, { payload }) => {
      const platforms = state.platforms.map((platform) => {
        if (platform.id === payload.platformId) {
          return { ...platform, wallets: [{ ...payload }, ...platform.wallets] };
        }
        return platform;
      });
      state.platforms = platforms;
    });
    builder.addCase(deleteWallet.fulfilled, (state, { payload }) => {
      const platforms = state.platforms.map((platform) => {
        const wallets = platform.wallets.filter((wallet) => {
          if (wallet.id === payload.id) {
            return false;
          }
          return true;
        });
        return { ...platform, wallets };
      });

      state.platforms = platforms;
    });
    builder.addCase(deleteDeposit.fulfilled, (state, { payload }) => {
      const platforms = state.platforms.map((platform) => {
        const deposits = platform.deposits.filter((deposit) => {
          if (deposit.id === payload.id) {
            return false;
          }
          return true;
        });
        return { ...platform, deposits };
      });

      state.platforms = platforms;
    });
    builder.addCase(deleteWithdraw.fulfilled, (state, { payload }) => {
      const platforms = state.platforms.map((platform) => {
        const withdraws = platform.withdraws.filter((withdraw) => {
          if (withdraw.id === payload.id) {
            return false;
          }
          return true;
        });
        return { ...platform, withdraws };
      });

      state.platforms = platforms;
    });
  },
});

export default platformSlice;
