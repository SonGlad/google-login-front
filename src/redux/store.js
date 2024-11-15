import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './Auth/auth-slice';


import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    'token',
    'currentLocation', 
  ],
};



const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
