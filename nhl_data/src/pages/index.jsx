import React from "react";
import "./updatedCss.css";

const Home = () => {
  return (
    <div className="layout">
      {/* Nav bar SVG */}
      <div className="shape path nav-bar-86b15268a0fc">
        <svg viewBox="402 214 1173 44" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M402,214L1575,214L1575,258L402,258L402,214"
            fill="#595a5c"
            fillOpacity="1"
          />
        </svg>
      </div>

      {/* Content box SVG */}
      {/* <div className="shape path content-86b6a471fb1e">
        <svg viewBox="402 258 1173 980" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M402.0000305175781,258L1575,258L1575,1238L402.0000305175781,1238L402.0000305175781,258"
            fill="#636666"
            fillOpacity="1"
          />
        </svg>
      </div> */}

      {/* Optional text content */}
      <div className="intro-text">
        <h1>Welcome to Mock DB</h1>
        <p>
          This project is based on the NHL API. Utilizing Postgres and React, this project displays historical data for players, teams, and games. Explore the tabs at the top to learn more.
        </p>
      </div>
    </div>
  );
};

export default Home;
