import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";


const useClickOutside = (handler) => {
  let domNode = useRef(); 

  // useEffect use for add and remove event listener on the document for closing the menu
  useEffect(() => {
    const maybeHandler = (event) => {
      if (!domNode.current?.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    document.addEventListener("scroll", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
      document.removeEventListener("scroll", maybeHandler);
    };
  });
  return domNode;
};


const NavLinks = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function is called when the menu icon is clicked
  let menuRef = useClickOutside(() => {
    setIsMenuOpen(false);
  });

  //  This function is called when a link is clicked
  const handlerLinkClick = () => {
    setIsMenuOpen(false);
  };

  {
    /* default styles for the nav links */
  }
  const baseLinkStyle = `
    text-md 
    lg:text-xl
    relative 
    py-2
    transition-all duration-300
   duration-300
    after:content-[''] 
    after:absolute 
    after:bottom-0 
    after:left-0 
    after:h-0.5 
    after:bg-blue-500 
    after:transition-all 
    after:duration-300
  `;

  // This function ONLY adds the classes that CHANGE the default styles
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-slate-900 lg:text-white font-bold after:w-full " 
      : "text-black lg:text-gray-400 hover:text-white after:w-0 hover:after:w-full hover:scale-105"; 

  return (
    <>
      <div className="lg:hidden z-50 absolute sm:static order-1 right-10">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>
      <nav
        ref={menuRef}
        className={`
      ${/* Mobile Styles */ ""}
      flex flex-col absolute z-100 gap-2 top-19 items-center ps-3 py-5  w-[90%] bg-white/20 backdrop-blur-sm rounded-lg 
      
      ${/* Desktop Styles */ ""}
      lg:backdrop-blur-none lg:static lg:flex-row lg:bg-slate-900 lg:w-auto lg:p-0 lg:gap-6 lg:opacity-100 lg:scale-100
      
      ${/* Logic of the menu btn */ ""}
      ${
        isMenuOpen
          ? "opacity-100 scale-100 transition-all duration-300 z-1000"
          : "opacity-0 scale-0 transition-all duration-300"
      }
      `}
      >
        <NavLink
          onClick={handlerLinkClick}
          to="/"
          className={({ isActive }) =>
            `${baseLinkStyle} ${navLinkClass({ isActive })}`
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          onClick={handlerLinkClick}
          to="/hollywood"
          className={({ isActive }) =>
            `${baseLinkStyle} ${navLinkClass({ isActive })}`
          }
        >
          Hollywood
        </NavLink>
        <NavLink
          onClick={handlerLinkClick}
          to="/bollywood"
          className={({ isActive }) =>
            `${baseLinkStyle} ${navLinkClass({ isActive })}`
          }
        >
          Bollywood
        </NavLink>
        <NavLink
          onClick={handlerLinkClick}
          to="/anime"
          className={({ isActive }) =>
            `${baseLinkStyle} ${navLinkClass({ isActive })}`
          }
        >
          Anime
        </NavLink>
        <NavLink
          onClick={handlerLinkClick}
          to="/watchlist"
          className={({ isActive }) =>
            `${baseLinkStyle} ${navLinkClass({ isActive })}`
          }
        >
          Watchlist
        </NavLink>
        <NavLink
          onClick={handlerLinkClick}
          to="/contact"
          className={({ isActive }) =>
            `${baseLinkStyle} ${navLinkClass({ isActive })}`
          }
        >
          Contact Us
        </NavLink>
      </nav>
    </>
  );
};

export default NavLinks;
