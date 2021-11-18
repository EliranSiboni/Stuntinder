import React from "react";
import { Frame, useMotionValue, useTransform, useAnimation } from "framer";

const CardItem = ({ id, name, image, movies }) => {
  // To move the card as the user drags the cursor
  const motionValue = useMotionValue(0);

  // To rotate the card as the card moves on drag
  const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);

  // To decrease opacity of the card when swiped
  const opacityValue = useTransform(
    motionValue,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );

  // Framer animation hook
  const animControls = useAnimation();

  const style = {
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "white",
    boxShadow: "5px 10px 18px #888888",
    borderRadius: 10,
    height: "30rem",
    width: "20rem",
  };

  return (
    <Frame
      center
      // Card can be drag only on x-axis
      drag="x"
      x={motionValue}
      rotate={rotateValue}
      opacity={opacityValue}
      dragConstraints={{ left: -1000, right: 1000 }}
      style={style}
      onDragEnd={(event, info) => {
        // If the card is dragged only upto 150 on x-axis
        // bring it back to initial position
        if (Math.abs(info.point.x) <= 150) {
          animControls.start({ x: 0 });
        } else {
          // If card is dragged beyond 150
          // make it disappear

          // Making use of ternary operator
          animControls.start({ x: info.point.x < 0 ? -200 : 200 });
        }
      }}
      children={
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            alignItems: "center",
            flexWrap: "wrap",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              backgroundColor: "white",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            <h3>{name}</h3>
          </div>
        </div>
      }
    />
  );
};

export default CardItem;