import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const customModal = ({ isOpen, onClose }) => {
  const [formActive, setFormActive] = useState(false);
  const [pageActive,setPageActive] = useState(false)

  const handleSignup = () => {
    // Add your signup logic here
    console.log("Signing up...");
    // Close the modal after signup
    onClose();
  };

  const handleFormActive = () => {
    setFormActive(!formActive);
  };

  const handleCloseModal = () => {
    setFormActive(false);
    onClose();
  };

  const handlePage = () =>{
    console.log("karthik")
    setPageActive(!pageActive)
  }
  

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
    return () => {
      body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Signup Modal"
      className="w-96 m-2   h-full bg-gray-100 mx-auto "
      overlayClassName="fixed inset-0 bg-black bg-opacity-70 z-[1000]"
    >
      { pageActive ?
        < Signup  formActive={formActive} handleCloseModal={handleCloseModal} handleFormActive={handleFormActive} handlePage={handlePage} />
        :
        < Login  formActive={formActive} handleCloseModal={handleCloseModal} handleFormActive={handleFormActive} handlePage={handlePage} />  
      }

    </Modal>
  )
}

export default customModal