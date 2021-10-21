import React from "react";
import styled from "styled-components";
import { withRouter, Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import StatDaily from "Components/StatComponents/StatDaily";
import StatWeekly from "Components/StatComponents/StatWeekly";
import StatMonthly from "Components/StatComponents/StatMonthly";

const Li = styled.li`
  text-decoration: none;
  border: ${(props) => (props.active ? "1px solid tomato" : "transparent")};
`;

const StatInnerMenu = withRouter(({ location: { pathname } }) => {
  return (
    <>
      <ul>
        <Li active={pathname === "/stat/daily"}>
          <Link to={"/stat/daily"}>Daily</Link>
        </Li>
        <Li active={pathname === "/stat/weeky"}>
          <Link to={"/stat/weeky"}>Weekly</Link>
        </Li>
        <Li active={pathname === "/stat/monthly"}>
          <Link to={"/stat/monthly"}>Monthly</Link>
        </Li>
      </ul>
      <Route path="/stat/daily" component={StatDaily} />
      <Route path="/stat/weeky" component={StatWeekly} />
      <Route path="/stat/monthly" component={StatMonthly} />
    </>
  );
});

StatInnerMenu.propTypes = {};

export default StatInnerMenu;
