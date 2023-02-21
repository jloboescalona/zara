//import store from "./redux/store";
import Pages from "client/App/pages";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import {store} from "client/App/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Pages />
  </Provider>
);