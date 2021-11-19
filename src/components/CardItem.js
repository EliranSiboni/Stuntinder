import React from "react";
import TinderCard from "react-tinder-card";
import "../styles/CardItem.css";

import CardInfo from "./CardInfo";

const CardItem = ({ id, name, image, movies, onSwipe, itemRef, index }) => {
  const HandleSwipe = (direction) => {
    onSwipe(
      direction,
      {
        id,
        name,
        image,
        movies,
      },
      index
    );
  };

  return (
    <div className="card-item__wrapper">
      <TinderCard
        ref={itemRef}
        className="card-item"
        onSwipe={HandleSwipe}
        preventSwipe={["up", "down"]}
      >
        <div
          className="card-item__items-wrapper"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <CardInfo name={name} movies={movies} />
        </div>
      </TinderCard>
    </div>
  );
};

export default CardItem;
