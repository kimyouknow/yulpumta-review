import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/stat">통계</Link>
        </li>
        <li>
          <Link to="/planner">플래너</Link>
        </li>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/group">그룹</Link>
        </li>
        <li>
          <Link to="/rank">랭킹</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
