import { configureStore } from '@reduxjs/toolkit';

import historySliceReducer from './reducers/History';
import platformSliceReducer from './reducers/Platform';
import platformHistorySliceReducer from './reducers/PlatformHistory';

export const store = configureStore({
  reducer: {
    history: historySliceReducer.reducer,
    platform: platformSliceReducer.reducer,
    platformHistory: platformHistorySliceReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
