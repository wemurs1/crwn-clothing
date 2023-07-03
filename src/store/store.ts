import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from '@redux-devtools/extension'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = process.env.NODE_ENV === 'development' ? [logger] : []

var composeEnhancer: any = null;

if (process.env.NODE_ENV !== 'production' && window) composeEnhancer = composeWithDevTools;
else composeEnhancer = compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)