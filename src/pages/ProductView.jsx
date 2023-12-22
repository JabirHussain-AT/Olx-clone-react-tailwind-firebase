import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import NavBar from "../components/Navbar";

const ProductView = () => {
  const [searchQuery] = useSearchParams();
  const [seller, setSeller] = useState(null); // Initialize state with null
  const [product, setProduct] = useState(null); // Initialize state with null
  const productId = searchQuery.get("productId"); // Correct the case of "productId"
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, [productId]); // Include productId in the dependency array

  const getProductDetails = async () => {
    try {
      const snapshot = await getDoc(doc(db, "products", productId));
      console.log(snapshot.data(), "afjiafioaejf");

      if (snapshot.exists()) {
        const productDetails = snapshot.data();
        setProduct(productDetails);

        const userId = snapshot.data().userId;
        const userSnapShot = await getDoc(doc(db, "users", userId));
        console.log(userId,"nokatte")
        if (userSnapShot.exists()) {
          setSeller(userSnapShot.data());
        } else {
          console.log("User does not exist");
        }
      } else {
        console.log("Product not found");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching product details", error);
      navigate("/");
    }
  };
  console.log(product?.productName,"product")

  if (!product || !seller) {
    // Add a loading state or return null while waiting for data
    return null;
  }

  return (
    <>
      <NavBar />
      <div className="p-4 pt-24 bg-slate-50">
        <div className="w-full h-96 flex justify-center bg-black">
          <img className="w-3/4 h-full p-4 border border-black object-cover" src={product?product.image: ''} alt="" />
        </div>
        <div className="grid lg:grid-cols-2 justify-center mt-5 shadow-lg mx-20 gap-0 m-2">
          <div className=" bg-white p-3 ">
            <div className="flex justify-start gap-4 ">
              <button className="bg-yellow-400 p-2 pb-2 text-center border rounded-md w-36 h-8">
                <i className="fa-solid fa-bolt-lightning me-2"></i>FEATURED
              </button>
              <button className="bg-slate-400 p-2  rounded-md text-blue-600 h-8">
                <i className="fa-solid fa-user-check me-2"></i>VERIFIED SELLER
              </button>
            </div>
           <div>
           {product  ? (
               <>
               <h1 className="text-3xl font-bold pl-2">{product?.productName}</h1>
               <p className="text-2xl font-bold pl-2"> {product?.price}.00 /- </p>
               <p className="text-sm font-sans">{product?.category}</p>
               {/* <span> posted on: {product?.createdAt}</span> */}
             </>
            ) : (
              ''
            )}
           </div>
          </div>
          <div className="bg-white ml-20 p-3">
            <p className="text-xl font-bold text-black pb-2">Seller details</p>
            {seller ? (
              <>
                <p>{seller.Username}</p>
                <p>{seller.Email}</p>
              </>
            ) : (
              <p className="text-red-800">
                Sorry for the inconvenience! seller details is not available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
