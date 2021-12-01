import React from "react";
import { Provider } from "react-redux";
import store from "./root";

// Components
import Header from "./components/header";
import List from "./components/list/Index";

// Consts
import { headerTitle } from "./components/constans/const";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Header title={headerTitle} />
        <List />
      </Provider>
    </div>
  );
}

export default App;
