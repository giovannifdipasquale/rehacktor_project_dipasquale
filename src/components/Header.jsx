import React, { Fragment } from "react";

import Searchbar from "./Searchbar";

import { Link, useNavigate } from "react-router";

import supabase from "../supabase/supabase-client";

import { useSession } from "../context/session/SessionContext";

import { FaUser } from "react-icons/fa";

import GenresDropdown from "./GenresDropdown";

import { GiHamburgerMenu } from "react-icons/gi";
import { RiHomeFill } from "react-icons/ri";
import logoWriting from "../assets/logo-writing.png";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import { AnimatePresence, easeOut, motion } from "framer-motion";

function Header() {
  const navigate = useNavigate();

  const { session } = useSession();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
    }

    alert("Signed out");

    navigate("/");
  };

  return (
    // Using Disclosure component from Headless U

    <nav className="header-nav bg-light z-50 relative flex h-16 items-center justify-between bg-base-200 px-4 shadow-lg lg:px-6">
      {/* Left: Logo / Home Link */}

      <div className="flex items-center logo-div m-2 rounded p-1">
        <Link to="/" className="logo text-2xl font-bold">
          <img
            className="logo"
            src={logoWriting}
            width="130"
            height="130"
            alt=""
          />
        </Link>
      </div>

      {/* Center Left: Home Link & Categories (Hidden on small screens) */}

      <div className="hidden h-full items-center lg:flex px-5">
        <ul className="flex h-full items-center space-x-2">
          <li>
            <Link
              to="/"
              className="dropdown-button flex items-center justify-center p-2 rounded font-bold"
            >
              <RiHomeFill className="text-xl" />
            </Link>
          </li>

          <li className="">
            <GenresDropdown />
          </li>
        </ul>
      </div>

      {/* Center: Searchbar (Hidden on small screens) */}

      <div className="hidden flex-grow px-2 lg:flex lg:justify-center">
        <Searchbar />
      </div>

      {/* Right: Account Dropdown & Login / Register */}
      <div className="px-4 hidden lg:flex items-center justify-center">
        <ul className="flex items-center justify-center h-full">
          {session ? (
            <>
              <li className="account-button relative">
                <FaUser className="user-icon text-xl me-2" />
                <span className="font-bold">
                  {session.user.user_metadata.username}
                </span>
                {/* <Link to="/profile">{session.user.user_metadata.username}</Link> */}
                <div className="dropdown-bridge"></div>

                <div className="dropdown-group rounded bg-lighter cursor-pointer ">
                  <ul className="max-h-64 overflow-y-auto">
                    <li className="">
                      <Link
                        className="dropdown-item block px-4 py-2"
                        to="/profile"
                      >
                        Favorites
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        className="dropdown-item block px-4 py-2"
                        to="/account"
                      >
                        {" "}
                        Account Settings
                      </Link>
                    </li>

                    <li className=" ">
                      <a
                        className=" logout dropdown-item block px-4 py-2"
                        onClick={signOut}
                        href="#"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <div className="h-full flex items-center ">
              <Link
                to="/login"
                className="login-button flex items-center justify-center p-2 cursor-pointer rounded font-bold"
              >
                Login
              </Link>
              <span className="ms-3 me-6 "> or </span>
              <Link
                to="/register"
                className="register-button flex items-center justify-center p-2  cursor-pointer rounded font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </ul>
      </div>
      {/* Mobile Menu Button (Visible only on small screens) */}

      <Disclosure as="div" className="flex lg:hidden w-full h-full">
        {({ open, close }) => (
          <>
            <DisclosureButton className="absolute right-1 p-4 rounded hover:text-white ">
              <GiHamburgerMenu
                className="h-6 w-6 transition duration-300 ease-in-out hover:scale-110"
                aria-hidden="true"
              />
            </DisclosureButton>
            <div className="overflow-hidden py-2">
              <AnimatePresence>
                {open && (
                  <DisclosurePanel static as={Fragment}>
                    <motion.div
                      initial={{ opacity: 0, y: -24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -24 }}
                      transition={{ duration: 0.2, ease: easeOut }}
                      className="absolute w-full top-15 left-0 space-y-1 theme-dark"
                    >
                      <Link
                        to="/"
                        className="block rounded-md px-3 py-3 text-base font-medium hover:bg-gray-700 hover:text-white"
                        onClick={close}
                      >
                        Home
                      </Link>

                      <div className="border-t border-gray-600 py-3">
                        {" "}
                        {/* Separator */}
                        {session ? (
                          <>
                            {/* Logged In Mobile Menu */}
                            <div className="flex items-center px-5">
                              <FaUser className="mr-3 h-8 w-8 text-gray-400" />
                              <div>
                                <div className="text-base font-medium leading-none">
                                  {session.user.user_metadata.username}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 space-y-1 px-2">
                              <Link
                                to="/profile"
                                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
                                onClick={close}
                              >
                                Favoritess
                              </Link>
                              <Link
                                to="/account"
                                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
                                onClick={close}
                              >
                                Account Settings
                              </Link>
                              <a
                                onClick={() => {
                                  signOut();
                                  close();
                                }}
                                href="#"
                                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
                              >
                                Logout
                              </a>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Logged Out Mobile Menu */}
                            <div className="space-y-1 px-2">
                              <Link
                                to="/login"
                                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
                              >
                                Login
                              </Link>
                              <Link
                                to="/register"
                                className="block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
                              >
                                Register
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </DisclosurePanel>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </Disclosure>
    </nav>
  );
}

export default Header;
