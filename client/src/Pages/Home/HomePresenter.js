import React from "react";

function HomePresenter({ clickLogout, subject }) {
  const { subjects, error } = subject;
  if (error) {
    alert(error);
  }
  return (
    <div>
      <button onClick={() => clickLogout()}>logout</button>
      <div>
        <h1>Timer</h1>
      </div>
      <div>
        <h1>Subjects</h1>
        <ul>
          {!subject ? (
            <div>Loading...</div>
          ) : (
            subjects.map((subject) => (
              <li key={subject._id}>
                <span>{subject.title}</span>
                <span>{subject.color}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default HomePresenter;
