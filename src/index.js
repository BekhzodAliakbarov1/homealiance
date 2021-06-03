import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducer";
import './I18Next'
import Loading from "./components/Loading/Loader";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<Loading/>}>
            <App />
        </Suspense>
    </Provider>
    , document.querySelector("#root")
);
