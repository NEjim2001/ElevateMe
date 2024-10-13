import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/user";

// Configuring redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the user state
};

// Combining reducers (for scalability)
const rootReducer = combineReducers({
  user: userReducer, // Add other reducers here if needed
});

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Creating a persistor
export const persistor = persistStore(store);
