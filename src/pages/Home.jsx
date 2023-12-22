import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import CategoryNav from "../components/CategoryNav";
import Banner from "../components/Banner";
import HomeHeading1 from "../components/HomeHeading1";
import Card from "../components/Card";
import toast, { Toaster } from "react-hot-toast";
import AuthProvider, { AuthContext } from "../context/AuthContext";
import ProductContext from "../context/ProductContext";


const Home = () => {
  const user = useContext(AuthContext);

  useEffect(() => {
    if ( user && !user.name) {
      toast.error("Please log in for more features"); // Use toast.error
    }
  }, [user, toast]);

  return (
    <>
      <Navbar />
      <CategoryNav />
      <Toaster />
      <Banner />
      <HomeHeading1 />
      <ProductContext>
        <Card />
      </ProductContext>
    </>
  );
};

export default Home;
