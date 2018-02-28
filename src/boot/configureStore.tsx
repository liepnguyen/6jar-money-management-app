import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import rootReducer from "../reducers";
import rootEpic from "../epics";

export default function configureStore(onCompletion: () => void): Store<{}> {
  const epicMiddleware = createEpicMiddleware(rootEpic);
  const enhancer = compose(
    applyMiddleware(thunk, epicMiddleware),
    devTools({
      name: "nativestarterkit",
      realtime: true
    })
  );

  storage.clear();

  const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['screens', 'form', 'realm']
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer, enhancer);
  persistStore(store, onCompletion);

  return store;
}
