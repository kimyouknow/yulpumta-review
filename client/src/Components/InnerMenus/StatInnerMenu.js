import React from 'react';
import styled from 'styled-components';
import { withRouter, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import StatDaily from 'Components/StatComponents/StatDaily';
import StatWeekly from 'Components/StatComponents/StatWeekly';
import StatMonthly from 'Components/StatComponents/StatMonthly';
import Empty from 'Components/Empty';

const Li = styled.li`
  text-decoration: none;
  border: ${(props) => (props.active ? '1px solid tomato' : 'transparent')};
`;

const StatInnerMenu = withRouter(({ location: { pathname }, dailyTotalTimes, dailyLapses }) => {
  return (
    <>
      <ul>
        <Li active={pathname === '/stat/daily'}>
          <Link to={'/stat/daily'}>Daily</Link>
        </Li>
        <Li active={pathname === '/stat/weeky'}>
          <Link to={'/stat/weeky'}>Weekly</Link>
        </Li>
        <Li active={pathname === '/stat/monthly'}>
          <Link to={'/stat/monthly'}>Monthly</Link>
        </Li>
      </ul>
      <Route path="/stat/daily" component={dailyLapses.length === 0 ? Empty : StatDaily} />
      <Route path="/stat/weeky" component={dailyTotalTimes.length === 0 ? Empty : StatWeekly} />
      <Route path="/stat/monthly" component={dailyTotalTimes.length === 0 ? Empty : StatMonthly} />
    </>
  );
});

StatInnerMenu.propTypes = {
  dailyTotalTimes: PropTypes.array,
  dailyLapses: PropTypes.array,
};

export default StatInnerMenu;
