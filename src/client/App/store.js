import { api } from 'client/App/api'
import {
  configureStore
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'local',
  storage,
};

const persistedReducer = persistReducer(persistConfig, api.reducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: persistedReducer
  },
  devTools: false,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(api.middleware)
})

setupListeners(store.dispatch)