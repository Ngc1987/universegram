import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.scss";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"
// Dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { getUsers } from "./actions/users.actions";

const store = createStore(
	rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUsers())

const root = ReactDOM.createRoot(document.getElementById('root'));
	root.render(
		<Provider store={store}>
			<App />
		</Provider>
);

