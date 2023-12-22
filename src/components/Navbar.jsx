import React, { useState, useContext } from "react";
import Logo from "../assets/olx-logo.png";
import { FiSearch, FiMapPin, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import { BiTargetLock, BiCheck, BiPlus } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext";
import Modal from "./customModal";
import { auth} from "../firebase/config";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [locationActive, setLocationActive] = useState(false);
  const [dropDownActiveLang, setDropDownActiveLang] = useState(false);
  const [logStatus, setLogStatus] = useState(true);
  const user = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          user.setAsUser(null);
          console.log("successfully logged out");
        })
        .catch((error) => {
          console.log("an error happened during log out");
        });
    }
  };

  

  const handleLogStatus = () => {
    setLogStatus(!logStatus);
  };

  const handleLocationDropDown = () => {
    setLocationActive(!locationActive);
  };

  const toggleDropDownActiveLang = () => {
    setDropDownActiveLang(!dropDownActiveLang);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative z-[999]">
      <nav className="bg-gray-200 h-[65px] z-[9999] p-2 flex items-center">
        <div className="flex items-center">
          <img className="h-12 w-20 m-2" src={Logo} alt="olxLogo" />
        </div>
        {/* location drop down */}
        <div
          onClick={handleLocationDropDown}
          className={` flex items-center bg-white rounded border-2 ${
            locationActive ? "border-teal-300" : "border-black"
          }`}
        >
          <div className="flex items-center mx-2">
            <span className="text-gray-500">
              <i className="fas fa-search text-blue-950"></i>
            </span>
          </div>
          <input
            onChange={''}
            className="h-10 p-2 flex-grow outline-none"
            type="text"
            value="India"
            
          />
          <div className="flex items-center mx-2">
            <span className="text-gray-500">
              <i
                className={`fas fa-chevron-down fa-lg text-blue-950 transition-transform ${
                  locationActive ? "transform rotate-180" : ""
                }`}
              ></i>
            </span>
          </div>
        </div>
        {/* location drop down end */}

        {/* Search Items */}
        <div className=" flex items-center flex-grow border-2 border-black rounded mx-2 bg-white">
          <input
            placeholder="Find Cars, Mobile Phones and more..."
            className="w-full outline-none py-2 px-2"
          />
          <div className="bg-cyan-950 p-2">
            <FiSearch className="text-white text-2xl" />
          </div>
        </div>
        {/* Search Items end */}

        {/* Language Dropdown */}
        <div
          className="flex items-center gap-2 py-2 px-2 mx-2 cursor-pointer"
          onClick={() => toggleDropDownActiveLang()}
        >
          <p className="uppercase text-sm font-semibold">English</p>
          <span>
            {dropDownActiveLang ? (
              <FiChevronUp className="text-2xl" />
            ) : (
              <FiChevronDown className="text-2xl" />
            )}
          </span>
          {/* Drop Down */}
          {dropDownActiveLang && (
            <div className="absolute top-14 bg-white w-60 right-24 shadow-xl">
              <div className="arrow-up"></div>
              <ul>
                <li className="flex items-center justify-between gap-2 px-5 py-3 hover:bg-cyan-300">
                  English
                  <BiCheck className="text-3xl" />
                </li>
                <li className="flex items-center gap-2 px-5 py-3 hover:bg-cyan-300">
                  Hindi
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* {login} */}
        {user && user.name ? (
          <button
            onClick={handleLogout}
            className="py-3 px-2 font-bold underline hover:no-underline underline-offset-4 mr-3 border-none"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={openModal}
            className="py-3 px-2 font-bold underline hover:no-underline underline-offset-4 mr-3 border-none"
          >
            Login
          </button>
        )}
        {/* <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} /> */}
        {/* <LoginModal isOpen={isSignupModalOpen} onClose={closeSignupModal} /> */}
        <Modal isOpen={isModalOpen} onClose={closeModal} />
        {/* {sell button} */}
        <button onClick={()=>{
          navigate('/sellProduct')
        }}
          className="bg-white py-2 px-5 rounded-full  shadow uppercase font-bold t flex items-center gap-2"
          style={{
            borderTop: "6px solid black",
            borderLeft: "6px solid yellow",
            borderRight: "6px solid blue",
            borderBottom: "6px solid skyblue",
          }}
        >
          <BiPlus size={20} /> Sell
        </button>
      </nav>

      {/* dropContent */}
      {locationActive && (
        <div className="absolute top-14 bg-white w-[280px] z-[12] ml-2 left-24 shadow-xl">
          <div className="flex py-2 px-5 items-center gap-2 text-blue-600">
            <BiTargetLock className="text-2xl" />
            <div>
              <p className="font-semibold">Use current location</p>
              <p className="text-sm">Kaloor, Kochi, Kerala, India</p>
            </div>
          </div>
          <p className="px-5 py-3 border-t border-gray-300">
            Popular Locations
          </p>
          <ul>
            <li className="flex items-center gap-2 px-5 py-3 hover:bg-cyan-300">
              <FiMapPin />
              Kerala
            </li>
            <li className="flex items-center gap-2 px-5 py-3 hover:bg-cyan-300">
              <FiMapPin />
              Tamil Nadu
            </li>
            <li className="flex items-center gap-2 px-5 py-3 hover:bg-cyan-300">
              <FiMapPin />
              Maharashtra
            </li>
            <li className="flex items-center gap-2 px-5 py-3 hover:bg-cyan-300">
              <FiMapPin />
              Punjab
            </li>
          </ul>
        </div>
      )}
      {/* dropContent */}
    </div>
  );
};

export default Navbar;
