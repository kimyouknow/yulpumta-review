import React from "react";

function HomePresenter({ clickLogout }) {
  return (
    <div>
      <button onClick={() => clickLogout()}>logout</button>
    </div>
  );
}

export default HomePresenter;
