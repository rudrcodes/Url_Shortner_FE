import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./Features/user.slice";
import { authApi } from "./API/auth.api";
import { shortenUrlApi } from "./API/other.api";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { toastSliceReducer } from "./Features/toast.slice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [authApi.reducerPath, shortenUrlApi.reducerPath],
};

const rootReducer = combineReducers({
  user: userSliceReducer,
  toast: toastSliceReducer,
  [authApi.reducerPath]: authApi.reducer,
  [shortenUrlApi.reducerPath]: shortenUrlApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) =>
    gDM({
      serializableCheck: false,
    }).concat(authApi.middleware, shortenUrlApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
