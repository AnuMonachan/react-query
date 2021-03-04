import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Person from "./Person";

const queryClient = new QueryClient();

const fetchPeople = async () => {
  const res = await fetch("http://swapi.dev/api/people/");
  return res.json();
};

const People = () => {
  const { data, status } = useQuery("People", fetchPeople);
  return (
    <div>
      <h2>People</h2>
      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching data</div>}

      {status === "success" &&
        data.results.map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </div>
  );
};

const hof = (WrappedComponent) => {
  // Its job is to return a react component wrapping the baby component
  return (props) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...props} />
    </QueryClientProvider>
  );
};

export default hof(People);
