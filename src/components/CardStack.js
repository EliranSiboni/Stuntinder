import React, { useEffect, useState, useRef, createRef, useMemo } from "react";

import CardItem from "./CardItem";
import Buttons from "./Buttons";
import { workers, LOCAL_STORAGE_KEY } from "../workers";
import { Portal } from "./Portal";
import SwipeModal from "./SwipeModal";

const HIDE_SWIPE_MODAL_KEY = "show_swipe_modal";

const CardStack = () => {
  const [workersAfterSwipe, setSwipedWorkers] = useState([]);
  const [availableWorkers, setAvailableWorkers] = useState(workers);
  const [showSwipeModal, setShowSwipeModal] = useState(0);

  // init current ref index
  const [currentIndex, setCurrentIndex] = useState(availableWorkers.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const canSwipe = currentIndex >= 0;

  useEffect(() => {
    // check if needed to show the swipe modal
    const hideModal = window.sessionStorage.getItem(HIDE_SWIPE_MODAL_KEY);
    if (!hideModal) {
      setShowSwipeModal(1);
    }

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

      // update current worker index
      setCurrentIndex(filteredWorkers.length - 1);

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
    [availableWorkers]
  );

  // current ref index update
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  // swipe card controller
  const swipe = (dir) => {
    if (canSwipe && currentIndex < availableWorkers.length) {
      childRefs[currentIndex].current.swipe(dir);
    }
  };

  const handleCardSwipe = async (direction, item, index) => {
    updateCurrentIndex(index - 1);
    setSwipedWorkers((prevSwipedWorkers) => {
      const editedItem = {
        ...item,
        approved: direction === "right",
      };
      return [...prevSwipedWorkers, editedItem];
    });
  };

  // handle swipe modal
  const handleSwipeModalToggle = () => {
    window.sessionStorage.setItem(HIDE_SWIPE_MODAL_KEY, 1);
    setShowSwipeModal(0);
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

  console.log(showSwipeModal);

  return (
    <>
      {currentIndex < 0 ? (
        <div style={{ padding: 80 }}>
          <h5 style={{ fontSize: 25, fontFamily: "Ubuntu" }}>
            No more swipes try later :)
          </h5>
        </div>
      ) : (
        <div>
          <div className="cards-wrapper">{cards}</div>
          <Buttons onSwipe={swipe} />
          <Portal>
            {showSwipeModal && (
              <SwipeModal toggleModal={handleSwipeModalToggle} />
            )}
          </Portal>
        </div>
      )}
    </>
  );
};

export default CardStack;
