import React, { useEffect, useState } from "react";
import { useGetStunts } from "../hooks/useGetStunts";

import "../styles/Stunts.css";

const Stunts = () => {
  const [swipedStunts, setSwipedStunts] = useState(useGetStunts());

  if (!swipedStunts.length) {
    return (
      <div style={{ padding: 80 }}>
        <span>No stunts yet. keep swiping!</span>
      </div>
    );
  }

  const stuntsItems = swipedStunts.map((stunt) => {
    return (
      <div
        className="card-wrapper"
        style={{
          backgroundImage: `url(${stunt.image})`,
        }}
      >
        <h4 className="title">{stunt.name}</h4>
      </div>
    );
  });

  return <div className="content-wrapper">{stuntsItems}</div>;
};

export default Stunts;
