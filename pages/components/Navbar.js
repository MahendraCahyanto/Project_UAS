// import Navbar from "pages/components/Navbar";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img
                className=" lg:block h-8 w-auto"
                src="/download.png"
                alt="Logo"
              />
            </div>
            <div className=" sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:text-gray-300 hover:border-gray-300">
                  Home
              </Link>
              <Link href="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:text-gray-300 hover:border-gray-300">
                  About
              </Link>
              <Link href="/services" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:text-gray-300 hover:border-gray-300">
                  Services
              </Link>
              <Link href="/contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-white hover:text-gray-300 hover:border-gray-300">
                  Contact
              </Link>
            </div>
          </div>
          <div className=" sm:flex sm:items-center sm:ml-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;