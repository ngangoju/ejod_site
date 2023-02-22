import React from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";

function Header(props) {
  const { toggleDarkMode } = props;

  return (
    <nav className="p-10 mb-12 flex justify-between">
      <h1 className="text-xl font-semibold">ƎJO-D</h1>
      <ul className="flex items-center">
        <li>
          <BsFillMoonStarsFill
            onClick={toggleDarkMode}
            className="cursor-pointer"
          />
        </li>
        <li>
          <a
            href="#"
            className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-4 py-2 rounded-md ml-8"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
