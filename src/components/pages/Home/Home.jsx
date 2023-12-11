import React from "react";
import { Link } from "react-router-dom";
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="my-container">
        <div className="main">
          <div className="text-center">
          <h1 className="fs-1 fw-bold text-light">Welcome to Out Website</h1>
          <h2 className="fs-3 fw-medium fst-italic text-light">
            Please{" "}
            <Link to="/registers" className="text-primary text-decoration-none">
              Registers
            </Link>{" "}
            or{" "}
            <Link to="/registers" className="text-primary text-decoration-none">
              Login
            </Link>{" "}
          </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
