import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Planet from "./Planet";

const queryClient = new QueryClient();

const fetchPlanets = async () => {
  const res = await fetch("http://swapi.dev/api/planets/");
  return res.json();
};

const Planets = () => {
  const { data, status } = useQuery("planets", fetchPlanets);
  return (
    <div>
      <h2>Planets</h2>
      {status === "loading" && <div>Loading data</div>}
      {status === "error" && <div>Error fetching data</div>}

      {status === "success" &&
        data.results.map((planet) => (
          <Planet key={planet.name} planet={planet} />
        ))}
    </div>
  );
};

const hof = (WrappedComponent) => {
  // Its job is to return a react component warpping the baby component
  return (props) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...props} />
    </QueryClientProvider>
  );
};

export default hof(Planets);
// export default Planets;
