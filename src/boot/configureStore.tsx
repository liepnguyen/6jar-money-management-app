import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import reducer from "../reducers";

export default function configureStore(onCompletion: () => void): any {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: "nativestarterkit",
      realtime: true
    })
  );

  // storage.clear();

  const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['screens', 'form']
  }

  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = createStore(persistedReducer, enhancer);
  persistStore(store, onCompletion);

  return store;
}
