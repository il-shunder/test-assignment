import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/reduxStore";
import ScrollToTop from "./components/common/ScrollToTop";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App />
                    </PersistGate>
                </Provider>
            </ScrollToTop>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);