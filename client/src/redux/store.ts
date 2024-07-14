import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import userReducer from "./user/userSlice";
import storage from 'redux-persist/lib/storage';    
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
const rootReducer = combineReducers({
    theme: themeReducer,
    user: userReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const persistor = persistStore(store);
