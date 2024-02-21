import React, { useState, useEffect, useRef } from "react";
// import { truncateStr } from "../utils/truncateStr";
import { useAppContext } from "../context/Context";

const Navbar = ({ showConnectModal }) => {
  const { wallet, resetWallet} = useAppContext();
  const [toggleValue, setToggle] = useState(false);

  const navRef = useRef(null);

  const handleToggle = () => {
    setToggle(!toggleValue);
  };

  const closeNavOnScroll = () => {
    if (toggleValue) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", closeNavOnScroll);
    return () => {
      window.removeEventListener("scroll", closeNavOnScroll);
    };
  }, [toggleValue]);

  return (
    <nav className="navbar">
      <div className="nav__header">
        <div
          onClick={handleToggle}
          className={
            (toggleValue && "nav__burger nav__burger--close") || "nav__burger"
          }
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="navbar__logo" href="/">
          <span className="text-[#1D4ED8]  leading-[0.25rem]">Academic Record</span> System
        </div>
      </div>
      <ul
        ref={navRef}
        className={
          (toggleValue && "nav__links nav__links--expanded") || "nav__links"
        }
      >
        <a
          href={"https://moi.technology"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Built on MOI
        </a>
        <button
          className="connect-button"
          onClick={wallet ? () => resetWallet() : () => showConnectModal(true)}
        >
          {
            wallet 
            // && wallet.getAddress
            ? 
            // `Disconnect: ${wallet && truncateStr(wallet?.getAddress(), 11)}`
            "Disconnect"
            : "Connect"
          }
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
