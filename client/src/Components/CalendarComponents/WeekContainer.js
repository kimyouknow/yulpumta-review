import React from 'react';
import styled from 'styled-components';
import { weeks } from 'global/global_variables';

const WContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
`;
const WContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  :nth-child(7n + 1) {
    color: #d13e3e;
  }
  :nth-child(7n) {
    color: #396ee2;
  }
`;

const WeekContainer = () => {
  return (
    <WContainer>
      {weeks.map((week) => (
        <WContent key={week}>{week}</WContent>
      ))}
    </WContainer>
  );
};

export default WeekContainer;
