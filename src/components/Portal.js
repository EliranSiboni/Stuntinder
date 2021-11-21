import { useEffect } from "react";
import ReactDOM from "react-dom";

export function Portal(props) {
  const portalRoot = document.getElementById("modal-swipe-info");
  const container = document.createElement("div");
  useEffect(() => {
    mountChild();
    function mountChild() {
      portalRoot.appendChild(container);
    }

    return function removeChild() {
      portalRoot.removeChild(container);
    };
  });
  const { children } = props;

  return ReactDOM.createPortal(children, container);
}
