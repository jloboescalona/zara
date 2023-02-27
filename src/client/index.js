//import store from "./redux/store";
import Pages from "client/App/pages";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { persistStore } from 'redux-persist'
import {store} from "client/App/store";

const container = document.getElementById("root");
const root = createRoot(container);
const persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Pages />
    </PersistGate>
  </Provider>
);