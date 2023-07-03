import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { composeWithDevTools } from '@redux-devtools/extension'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./root-saga";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = process.env.NODE_ENV === 'development' ? [logger, sagaMiddleware] : [sagaMiddleware]

var composeEnhancer: any = null;

if (process.env.NODE_ENV !== 'production' && window) composeEnhancer = composeWithDevTools;
else composeEnhancer = compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch