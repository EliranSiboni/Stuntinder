import React, { useEffect, useState, useRef, createRef, useMemo } from "react";

import CardItem from "./CardItem";
import Buttons from "./Buttons";
import { workers, LOCAL_STORAGE_KEY } from "../workers";

const CardStack = () => {
  const [workersAfterSwipe, setSwipedWorkers] = useState([]);
  const [availableWorkers, setAvailableWorkers] = useState(workers);

  // init current ref index
  const [currentIndex, setCurrentIndex] = useState(availableWorkers.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const canSwipe = currentIndex >= 0;

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

  // create ref to all cards and
  const childRefs = useMemo(
    () =>
      Array(availableWorkers.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  // current ref index update
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // swipe card controller
  const swipe = async (dir) => {
    if (canSwipe && currentIndex < availableWorkers.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const handleCardSwipe = (direction, item, index) => {
    updateCurrentIndex(index - 1);
    setSwipedWorkers((prevSwipedWorkers) => {
      const editedItem = {
        ...item,
        approved: direction === "right",
      };
      return [...prevSwipedWorkers, editedItem];
    });
  };

  const cards = availableWorkers.map((worker, index) => (
    <CardItem
      itemRef={childRefs[index]}
      index={index}
      key={worker.id.toString()}
      id={worker.id}
      name={worker.name}
      image={worker.image}
      movies={worker.movies}
      onSwipe={handleCardSwipe}
    />
  ));

  return (
    <div>
      <div className="cards-wrapper">{cards}</div>
      <Buttons onSwipe={swipe} />
    </div>
  );
};

export default CardStack;
