import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'; // ✅ ICI on utilise sessionStorage
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

// Configuration de persistance
const persistConfig = {
  key: 'root',
  storage: storageSession, // ✅ sessionStorage au lieu de localStorage
  whitelist: ['auth'], // persiste uniquement auth
  blacklist: [apiSlice.reducerPath], // ignore API cache
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER'
        ],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
export default store;
