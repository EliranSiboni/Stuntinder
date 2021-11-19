import { BsFillHeartFill } from "react-icons/bs";

import "../styles/Buttons.css";

const Buttons = ({ onSwipe }) => {
  return (
    <div className="buttons-wrapper">
      <div className="buttons-wrapper__items-wrapper">
        <button
          className="items-wrapper__reject-btn"
          onClick={() => onSwipe("left")}
        >
          X
        </button>
        <button
          className="items-wrapper__approve-btn"
          onClick={() => onSwipe("right")}
        >
          <BsFillHeartFill className="approve-btn" size={40} />
        </button>
      </div>
    </div>
  );
};

export default Buttons;
