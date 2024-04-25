import { FC } from "react";
import ReactDOM from "react-dom";
import onGoingIcon from "../../img/ongoing.svg";

import "./Spinkit.css";

export const Spinkit: FC = () => {
  return ReactDOM.createPortal(
    <div className="spinkit">
      <img
        src={onGoingIcon}
        alt="ongoing"
        className="inline h-72 w-72 sm:h-72 sm:w-72 animate-spin"
      />
    </div>,
    document.getElementById("spinkit")!
  );
};
