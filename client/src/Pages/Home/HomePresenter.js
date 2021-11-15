import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function HomePresenter({ subject, clickLogout, handleEditSubject, handleAddSubject }) {
  const { subjects, error } = subject;
  return (
    <div>
      <button onClick={() => clickLogout()}>logout</button>
      <div>
        <h1>Timer</h1>
      </div>
      <div>
        <h1>Subjects</h1>
        <ul>
          <li>
            <button onClick={() => handleAddSubject()}>+</button>
            <span>과목추가</span>
          </li>
          {!subjects || error ? (
            <div>Loading...</div>
          ) : (
            subjects.map((subject) => (
              <li key={subject._id}>
                <Link to={{ pathname: '/active', state: { subject } }}>
                  <button>기록</button>
                </Link>
                <span>{subject.title}</span>
                <span> | </span>
                <span>{subject.todayTotalT}</span>
                <button onClick={() => handleEditSubject(subject)}>수정</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

HomePresenter.propTypes = {
  subject: PropTypes.shape({
    _id: PropTypes.string,
    color: PropTypes.string,
    user_id: PropTypes.string,
    lapses: PropTypes.array,
  }),
  clickLogout: PropTypes.func,
  handleEditSubject: PropTypes.func,
  handleAddSubject: PropTypes.func,
};

export default HomePresenter;
