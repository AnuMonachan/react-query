import React from "react-query";

const Person = ({ person }) => {
  return (
    <div className="card">
      <h3>{person.name}</h3>
      <p>Gender - {person.gender}</p>
      <p>Birth Year - {person.birth_year}</p>
    </div>
  );
};

export default Person;
