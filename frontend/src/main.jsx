import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import userReducer, { initialState } from "./reducer/userReducer";

import App from "./App";

const root = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider reducer={userReducer} initialState={initialState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>,
  root
);
