import React from "react";

import CardItem from "./CardItem";
import { workers } from "../workers";

const CardStack = () => {
  const cards = workers.map((worker) => (
    <CardItem
      id={worker.id}
      name={worker.name}
      image={worker.image}
      movies={worker.movies}
    />
  ));

  return <div>{cards}</div>;
};

export default CardStack;
