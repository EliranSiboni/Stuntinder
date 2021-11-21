import { AiTwotoneFire } from "react-icons/ai";
import { BsArrowRepeat } from "react-icons/bs";
import { LOCAL_STORAGE_KEY } from "../workers";
import { Link } from "react-router-dom";

import "../styles/Header.css";

const Header = () => {
  const handleRefresh = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.reload(false);
  };

  return (
    <div className="header-wrapper">
      <div className="header__btns-wrapper">
        <AiTwotoneFire size={30} color={"#f54f5f"} />
        <h1>
          Stun<span style={{ color: "#f54f5f" }}>tinder</span>
        </h1>
      </div>
      <div className="header__btns-wrapper">
        <button className="header__refresh-btn" onClick={handleRefresh}>
          <BsArrowRepeat size={30} className="refresh-btn" />
        </button>
        <Link className="header__stunts-btn" to="/stunts">
          My stunts
        </Link>
      </div>
    </div>
  );
};

export default Header;
