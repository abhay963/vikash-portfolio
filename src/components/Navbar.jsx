import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Vikash &nbsp;
            <span className="sm:block hidden">| Energy Sector Professional</span>
          </p>
        </Link>

        {/* 🖥️ Desktop Nav */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`text-secondary text-[18px] font-medium cursor-pointer ${
                active === nav.title ? "text-white" : ""
              }`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}

          {/* ✅ Resume Button */}
          <li
            onClick={() => setActive("Resume")}
            className={`text-secondary text-[18px] font-medium cursor-pointer ${
              active === "Resume" ? "text-white" : ""
            }`}
          >
            <a
               href="/Vikash-Kumar-Yadav.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>

          {/* ✅ LinkedIn Button */}
          <li
            onClick={() => setActive("LinkedIn")}
            className={`text-secondary text-[18px] font-medium cursor-pointer ${
              active === "LinkedIn" ? "text-white" : ""
            }`}
          >
            <a
              href="https://linkedin.com/in/vikash-kumar-yadav-31792224b"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
        </ul>

        {/* 📱 Mobile Nav */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`text-secondary text-[16px] font-medium cursor-pointer ${
                    active === nav.title ? "text-white" : ""
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}

              {/* ✅ Resume Mobile */}
              <li
                onClick={() => {
                  setToggle(false);
                  setActive("Resume");
                }}
                className={`text-secondary text-[16px] font-medium cursor-pointer ${
                  active === "Resume" ? "text-white" : ""
                }`}
              >
                <a
                 href="/Vikash-Kumar-Yadav.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </li>

              {/* ✅ LinkedIn Mobile */}
              <li
                onClick={() => {
                  setToggle(false);
                  setActive("LinkedIn");
                }}
                className={`text-secondary text-[16px] font-medium cursor-pointer ${
                  active === "LinkedIn" ? "text-white" : ""
                }`}
              >
                <a
                  href="https://linkedin.com/in/vikash-kumar-yadav-31792224b"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
