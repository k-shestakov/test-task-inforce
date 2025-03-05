import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

const element = document.getElementById("root") as HTMLElement;
const root = createRoot(element);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
