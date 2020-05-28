import React, { useState } from "react";
import Store from "./store";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Components/Routes";

const isLoggedIn = localStorage.getItem("token") ? true : false;

const App = () => {
  const [open, setOpen] = useState(false);
  const [videosItem, setVideosItem] = useState([]);
  return (
    <Store.Provider value={[videosItem, setVideosItem, open, setOpen]}>
      <Router>
        <Routes isLoggedIn={isLoggedIn} />
      </Router>
    </Store.Provider>
  );
};

export default App;
