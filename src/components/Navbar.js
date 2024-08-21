import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 py-4 fixed w-full top-0 left-0 z-50">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link
            to="/"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded"
          >
            Vote Page
          </Link>
        </li>
        <li>
          <Link
            to="/outputs"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded"
          >
            Voters List
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;