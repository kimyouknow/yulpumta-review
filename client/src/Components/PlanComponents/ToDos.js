import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ToDoContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 90%;
  z-index: 5;
`;

const ToDoElement = styled.div`
  font-size: 0.9rem;
  padding: 4px 0;
  color: #fff;
  margin-top: 4px;
  text-align: center;
  background-color: rgba(164, 176, 190, 1);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: rgba(164, 176, 190, 0.5);
    opacity: 1;
    visibility: visible;
  }
  &.overflow {
    z-index: ${(props) => (props.isActive ? '10' : '-1')};
    opacity: ${(props) => (props.isActive ? '1' : '0')};
    visibility: ${(props) => (props.isActive ? 'visible' : 'hidden')};
  }
  &.more {
    text-align: center;
  }
`;

const ToDos = ({ plans, handleEditSubject }) => {
  const activeRef = useRef(false);
  const plansLen = plans.length;
  const firstPlan = plans[0];
  const restPlans = plans.slice(1);
  const reduceString = (text) => (text.length > 8 ? text.substring(0, 8) : text);
  const onClickHover = useCallback(() => {
    const { current } = activeRef;
    activeRef.current = !current;
  }, []);
  return (
    <ToDoContainer>
      {plansLen < 4 ? (
        <>
          {plans.map((plan) => (
            <ToDoElement onClick={() => handleEditSubject(plan)} key={plan._id}>
              {reduceString(plan.p_title)}
            </ToDoElement>
          ))}
        </>
      ) : (
        <>
          <ToDoElement onClick={() => handleEditSubject(firstPlan)} key={firstPlan._id}>
            {reduceString(firstPlan.p_title)}
          </ToDoElement>
          <ToDoElement className={'more'} onClick={onClickHover}>
            +
          </ToDoElement>
          {restPlans.map((restPlan) => (
            <ToDoElement
              onClick={() => handleEditSubject(restPlan)}
              className={'overflow'}
              key={restPlan._id}
              isActive={activeRef.current}
            >
              {reduceString(restPlan.p_title)}
            </ToDoElement>
          ))}
        </>
      )}
    </ToDoContainer>
  );
};

ToDos.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      user_id: PropTypes.string,
      _id: PropTypes.string,
      date: PropTypes.number,
      p_title: PropTypes.string,
      p_date: PropTypes.string,
      p_desc: PropTypes.string,
      p_isDone: PropTypes.bool,
    }),
  ),
  handleEditSubject: PropTypes.func,
};

export default ToDos;
