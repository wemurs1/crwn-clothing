import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";

const middleWares = process.env.NODE_ENV === 'development' ? [logger] : []

const composedEnhancers = compose(applyMiddleware(...middleWares))

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)