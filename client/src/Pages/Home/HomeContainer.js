import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import HomePresenter from "./HomePresenter";

function HomeContainer() {
  const history = useHistory();
  const clickLogout = () => {
    axios.get("/api/logout").then(({ data: { success, message } }) => {
      if (success) {
        history.push("/login");
      } else {
        console.log(message);
        alert("Failed to logout");
      }
    });
  };
  return <HomePresenter clickLogout={clickLogout} />;
}

export default HomeContainer;
