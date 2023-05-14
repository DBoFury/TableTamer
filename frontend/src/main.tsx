import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./stores/store";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  throw new Error('Root element with ID "root" not found in the document.');
}
