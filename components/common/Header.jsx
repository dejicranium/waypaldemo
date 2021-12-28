import Modal from "../Modal";
import Button from "./Button";
import Avatar from "../Avatar";
import UserAvatar from "react-user-avatar";
import Icon from "./Icon";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Login from "../../components/LogIn";
import Register from "../../components/Register";
import ForgotPassword from "../ForgotPassword";

import { Divide as Hamburger } from "hamburger-react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import useData from "../hooks/useData";
import { useRouter } from "next/router";
import useClickOutside from "../hooks/useClickOutside";

const Header = ({ open, setOpen }) => {
  const {
    data: {
      user: { firstname, lastname },
      isLoggedIn = false,
    },
  } = useData();
  const targetRef = useRef();
  const dropRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { push } = useRouter();
  const { dispatch } = useData();
  const [active, setActive] = useState("login");
  const [showAuthModal, setShowAuthModal] = useState(false);

  useClickOutside(() => setShowProfileMenu(false), dropRef);

  const openLoginModal = () => {
    setOpen(false);
    return setShowAuthModal((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    return setShowProfileMenu((prev) => !prev);
  };

  const openingLink = () => {
    setOpen(false);
  };

  const createTrip = () => {
    if (isLoggedIn) {
      setOpen(false);
      push("/create");
    } else {
      openLoginModal();
    }
  };

  const logout = () => {
    dispatch("clear");
    setOpen(false);
    push("/logout");
  };

  useEffect(() => {
    setLoaded(true);

    if (open) {
      disableBodyScroll(targetRef);
      window.scrollTo({ top: 0 });
    } else {
      enableBodyScroll(targetRef);
    }

    return () => {
      setLoaded(false);
      clearAllBodyScrollLocks();
    };
  }, [loaded]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/waypal-logo.png" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="Find your next travel buddy!" />
        <meta name="author" content="Waypal" />
        <meta name="keyword" content="Waypal, Travel, Trip" />
        <meta name="application-name" content="Waypal" />
        <meta name="generator" content="Waypal.co" />
      </Head>
      <Modal showModal={showAuthModal} close={setShowAuthModal}>
        {active === "login" && (
          <Login setActive={setActive} close={() => setShowAuthModal(false)} />
        )}
        {active === "register" && (
          <Register
            setActive={setActive}
            close={() => setShowAuthModal(false)}
          />
        )}
        {active === "forgot" && (
          <ForgotPassword
            setActive={setActive}
            close={() => setShowAuthModal(false)}
          />
        )}
      </Modal>
      <div className="">
        <nav className="navigation-bar">
          <div className="hidden md:block max-w-7xl mx-auto mt-6 px-4 border-b-2 border-dashed border-gray-light3">
            <div className="flex justify-between mb-6">
              <div className="logo">
                <Link href="/">
                  <a>
                    <Icon icon="waypal-logo" />
                  </a>
                </Link>
              </div>

              <div className="flex items-center primary-nav text-black">
                {/* Top Destinations */}
                <div className="mr-6 text-base">
                  <Link href="/#top-destinations">Top destinations</Link>
                </div>
                {/* Explore */}
                <div className="mr-6 text-base">
                  <Link href="/search">Explore</Link>
                </div>

                {/* Login */}
                {!isLoggedIn && (
                  <>
                    <Button
                      key={1}
                      btnText="Login"
                      onClick={() => setShowAuthModal(true)}
                      btnStyle="mr-6 border-2 border-orange text-orange px-4 py-1.5 rounded"
                    />
                  </>
                )}

                {/* Create Trip */}
                <Button
                  key={2}
                  onClick={createTrip}
                  btnText="Create a trip"
                  btnStyle="mr-6 bg-orange text-white px-4 py-2 rounded"
                />

                {isLoggedIn && (
                  <div className="relative">
                    <div className=" flex items-center">
                      <UserAvatar
                        size="48"
                        name={`${firstname.toUpperCase()} ${lastname.toUpperCase()}`}
                        color="#5CD6C0"
                        // src="/david.jpg"
                      />
                      <div className="" onClick={toggleProfileMenu}>
                        <Icon icon="down-arrow" cname="ml-2 cursor-pointer" />
                      </div>
                    </div>
                    <div className="profile-menu">
                      <div
                        ref={dropRef}
                        className={
                          showProfileMenu
                            ? "absolute rounded shadow-md bg-white right-0 z-10"
                            : "hidden"
                        }
                      >
                        <ul className="py-4 px-2 profile-menu-list">
                          <li className="py-3 rounded px-10">
                            <Link href="/dashboard/profile">Dashboard</Link>
                          </li>
                          <li
                            className="py-3 rounded px-10 text-center"
                            onClick={logout}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden border-b-2 border-dashed border-gray-light3">
            <div className="mobile-nav mt-10 mb-4">
              <div className="flex items-center justify-between px-4">
                {/* <Icon icon="hamburger" cname="" /> */}
                <Hamburger
                  toggled={open}
                  toggle={setOpen}
                  color="#333333"
                  distance="sm"
                  rounded
                  label="show menu"
                  size={30}
                  hideOutline={true}
                />

                <div className="logo">
                  <Link href="/">
                    <a>
                      <Icon icon="waypal-logo" />
                    </a>
                  </Link>
                </div>

                <div className="flex items-center">
                  <Button
                    onClick={createTrip}
                    btnText="Create a trip"
                    btnStyle="mr-6 bg-orange text-white px-4 py-2 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu goes here */}
          <nav
            className={`md:hidden fixed ${
              open ? "left-0 transition duration-500 block" : "left-3/4 hidden"
            } top-0 h-screen bg-white z-50 w-3/4 p-6 shadow`}
          >
            <div className="flex flex-col">
              <div className="logo mb-6">
                <Link href="/">
                  <a>
                    <Icon icon="waypal-logo" />
                  </a>
                </Link>
              </div>

              <div className="flex flex-col text-left primary-nav">
                {/* name */}
                {isLoggedIn && (
                  <div className="text-3xl pb-10 font-circular-bold text-gray-light8">
                    <h2>Hey {firstname}</h2>
                  </div>
                )}

                {/* Top Destinations */}
                <div className="my-2 text-base text-black font-circular-bold pb-4">
                  <Link href="/#more-destinations">
                    <a onClick={(e) => setOpen(false)}>Top destinations</a>
                  </Link>
                </div>
                {/* Explore */}
                <div className="my-2 text-base text-black font-circular-bold pb-4">
                  <Link href="/search">
                    <a onClick={(e) => setOpen(false)}>Explore</a>
                  </Link>
                </div>
                {/* Dashboard */}
              
                {isLoggedIn && (
                  <>
                    {/*
                    <div className="my-2 text-base text-black font-circular-bold pb-4">
                      <Link href="/dashboard/profile">
                        <a onClick={openingLink}>Dashboard</a>
                      </Link>
                    </div> */}

                    {/* Dashboard links */}
                    <div className="dashboard-links border-t pt-6">
                      <div className="my-2 text-base text-black font-circular-bold pb-4">
                        <Link href="/dashboard/profile">
                          <a onClick={openingLink}>Profile Information</a>
                        </Link>
                      </div>

                      <div className="my-2 text-base text-black font-circular-bold pb-4">
                        <Link href="/dashboard/trips">
                          <a onClick={openingLink}>My Trips</a>
                        </Link>
                      </div>

                      <div className="my-2 text-base text-black font-circular-bold pb-4">
                        <Link href="/dashboard/payments">
                          <a onClick={openingLink}>Payments</a>
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {/* Login */}
                {!isLoggedIn && (
                  <Button
                    onClick={openLoginModal}
                    btnText="Login"
                    btnStyle="my-2 border-2 border-orange text-orange px-4 py-1.5 rounded"
                  />
                )}
                {/* Create Trip */}
                <Button
                  onClick={createTrip}
                  btnText="Create a trip"
                  btnStyle="my-2 bg-orange text-white px-4 py-2 rounded"
                />
                {isLoggedIn && (
                  <Button
                    onClick={logout}
                    btnText="Log out"
                    btnType="outline"
                  />
                )}
              </div>
            </div>
          </nav>
        </nav>
      </div>
    </>
  );
};

export default Header;
