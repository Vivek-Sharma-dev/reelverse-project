import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
    {/* ReelVerse Logo */}
      <Link to="/">
        <h1 className="">
          <img
            src="/reelverse_logo.png"
            alt="ReelVerse Logo"
            className="object-contain h-5 md:h-10 w-auto"
          />
        </h1>
      </Link>
    </>
  );
};

export default Logo;
