import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../reducer/counterReducer'
import userReducer from '../reducer/userReduser'
import storage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import projectReduser from '../reducer/projectReduser'
import taskReducer from '../reducer/taskReduser'
import dataSlice from './../reducer/counterReducer';

const persistConfig = {
    key: "root",
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig, counterReducer)
const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const Store = configureStore({
    reducer: {
        data: dataSlice,
        user: persistedUserReducer,
        project: projectReduser,
        task: taskReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //immutableCheck: false,
        // serializableCheck: false
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
})

export const persistor = persistStore(Store)