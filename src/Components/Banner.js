import React, { useState } from "react";
import "./banner.css";
import { Button } from "@material-ui/core";

function Banner() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <div className="banner">
      <div className="banner__search">
        {showSearch && <h1>Show Date Picker </h1>}
        <Button
          varient="outlined"
          onClick={() => setShowSearch(!showSearch)}
          className="banner__searchButton"
        >
          Search Dates
        </Button>
      </div>
      <div className="banner__info">
        <h1>Get out and stretch your imagination</h1>
        <h5>
          plan a different kind of getaway to uncover the hidden gems near you.{" "}
        </h5>
        <Button varient="outlined">Explore Nearby</Button>
      </div>
    </div>
  );
}
export default Banner;
