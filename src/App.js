import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import ManualList from "./Components/ManualList";
import Header from "./Components/Header";

import Home from "./Components/Home";

function App() {
  return (
    <div className="app">
      {/* <ManualList /> */}
      <Header />
      <Home />
    </div>
  );
}

export default App;
