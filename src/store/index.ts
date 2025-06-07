import { configureStore, combineReducers } from "@reduxjs/toolkit";
import uploadReducer from "./slices/uploadSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

//rootReducer combine
const rootReducer = combineReducers({
    upload: uploadReducer,
    // başkaları varsa buraya ekleyin
});

//persist config
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["upload"], // yalnızca upload slice’ini sakla
};

//persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
