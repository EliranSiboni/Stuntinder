import React from "react";
import TinderCard from "react-tinder-card";
import "../styles/CardItem.css";

import CardInfo from "./CardInfo";

const CardItem = ({ id, name, image, movies, onSwipe }) => {
  const HandleSwipe = (direction) => {
    onSwipe(direction, {
      id,
      name,
      image,
      movies,
    });
  };

  //   const onCardLeftScreen = (myIdentifier) => {
  //     console.log(myIdentifier + " left the screen");
  //   };

  return (
    <div className="card-item__wrapper">
      <TinderCard
        className="card-item"
        onSwipe={HandleSwipe}
        // onCardLeftScreen={() => onCardLeftScreen("fooBar")}
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
