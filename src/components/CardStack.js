import React, { useEffect, useState } from "react";

import CardItem from "./CardItem";
import { workers } from "../workers";

const LOCAL_STORAGE_KEY = "workers";

const CardStack = () => {
  const [workersAfterSwipe, setSwipedWorkers] = useState([]);
  const [availableWorkers, setAvailableWorkers] = useState(workers);

  useEffect(() => {
    // load swiped workers and filter from the datastore
    const swipedWorkers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (swipedWorkers) {
      const filteredWorkers = workers.filter((worker) => {
        return (
          swipedWorkers.filter((swipedWorker) => {
            return worker.id === swipedWorker.id;
          }).length === 0
        );
      });

      // set available workers that did not swiped yet
      setAvailableWorkers(filteredWorkers);

      // init swiped workers
      setSwipedWorkers(swipedWorkers);
    }
  }, []);

  useEffect(() => {
    // set swiped workers in localstorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workersAfterSwipe));
  }, [workersAfterSwipe]);

  const handleCardSwipe = (direction, item) => {
    setSwipedWorkers((prevSwipedWorkers) => {
      return [...prevSwipedWorkers, item];
    });
  };

  const cards = availableWorkers.map((worker) => (
    <CardItem
      key={worker.id.toString()}
      id={worker.id}
      name={worker.name}
      image={worker.image}
      movies={worker.movies}
      onSwipe={handleCardSwipe}
    />
  ));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {cards}
    </div>
  );
};

export default CardStack;
