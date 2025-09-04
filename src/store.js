import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

// Configuration de persistance
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Persister seulement le slice auth
  blacklist: [apiSlice.reducerPath] // Ne pas persister les données API
};

// Combiner tous les reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

// Créer le reducer persisté
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions de redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

// Créer le persistor
export const persistor = persistStore(store);
export default store;