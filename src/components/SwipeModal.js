import React from "react";
import { MdOutlineSwipe } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import "../styles/SwipeModal.css";

const SwipeModal = ({ toggleModal }) => {
  return (
    <div className="modal-popup" onClick={toggleModal}>
      <span className="close-button" onClick={toggleModal}>
        <i>X</i>
      </span>
      <div className="modal-overlay"></div>
      <div
        className="modal-wrapper"
        aria-modal="true"
        aria-hidden="true"
        role="dialog"
      >
        <div className="modal-content">
          <div className="modal-swipe-info__wrapper">
            <div className="modal-swipe-info__left">
              <FaAngleLeft className="modal-swipe-info__left-icon" size={80} />
              <span className="modal-swipe-info__text">MAYBE NEXT TIME...</span>
            </div>
            <div id="slide" className="modal-swipe-info__middle">
              <MdOutlineSwipe
                className="modal-swipe-info__middle-icon"
                size={80}
              />
            </div>
            <div className="modal-swipe-info__right">
              <FaAngleRight
                className="modal-swipe-info__right-icon"
                size={80}
              />
              <span className="modal-swipe-info__text">I WANT YOU!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeModal;
