import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import googleIcon from "../assets/g-icon.png";
import Carosal from "../components/Signup.jsx/Carosal";
import LoginForm from "../components/Login.jsx/LoginForm";
import { AuthContext } from "../context/AuthContext";
import { auth, googleProvider } from "../firebase/config";
import { signInWithPopup } from "firebase/auth";

const Login = ({ formActive, handleCloseModal, handleFormActive, handlePage }) => {
  const [signInError, setSignInError] = useState(null);
  const { setAsUser } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setAsUser(user);
      handleCloseModal();
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setSignInError(error.message);
    }
  };

  return (
    <>
      <div onClick={handleCloseModal} className="flex justify-end items-center p-2">
      <span>Login Page</span>  <AiOutlineClose className="text-xl" />
      </div>
      <div className="p-4">
        <div className="p-0">
          <Carosal />
        </div>
        <div className="mt-8">
          {!formActive && (
            <button
              onClick={handleFormActive}
              className="bg-white border-2 my-3 border-green-950 w-full py-2 rounded text-start"
            >
              <span><i className="fas fa-mobile-alt mx-2 "></i></span>Continue with Email
            </button>
          )}
          {formActive && <LoginForm onClose={handleCloseModal} />}
          <div className="flex justify-center ">
            <h1 className="font-bold font-mono text-green-950 P-3"> OR </h1>
          </div>
          <button onClick={handleGoogleSignIn} className="bg-white border border-black w-full h-10 py-2 rounded ">
            <span className="flex justify-start ml-2">
              <img
                className="w-[20px] h-auto mr-2"
                src={googleIcon}
                alt="g-icon"
              />
              Continue with Google
            </span>
          </button>
          {/* Display the error message if there is one */}
          {signInError && (
            <p className="text-red-500 mt-2">{signInError}</p>
          )}
          <h3>
            Don't have an Account ?{' '}
            <span onClick={handlePage} className="text-blue-800 underline"> Click here</span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Login;
