import React, { useState } from "react";
import ProductImage from "../../public/Product1.webp";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/ProductContext";

const Card = () => {
  const { data, incrementLimit, error } = useData();
  const navigate = useNavigate();

  const handleCardClick = (productId) => {
    navigate(`/product-details?productId=${productId}`);
  };

  return (
    <>
      {data && (
        <div className="flex flex-wrap justify-start px-7">
          { data.map((product,index)=>{
            return <div  key={product.id} onClick={() => handleCardClick(product.id)}
            style={{ cursor: "pointer" }} className="lg:w-1/4 md:w-1/4 sm:w-full p-4 relative">
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-black">
                { index < 2 &&  (
                  
                  <div className="absolute top-8 left-8 w-20 bg-yellow-400 text-sm font-sans rounded flex items-center justify-center">
                    <i className="fas fa-bolt text-md mx-1"></i>Featured
                  </div>
                )}
                <img
                  src={product?.image}
                  alt="Product"
                  className="w-full p-3 h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-xl font-bold mb-1">₹ {product?.price} </p>
                  <p className="text-gray-600 text-sm font-sans">  
                   {product?.productName}
                  </p>
                  <p className="text-gray-600 text-xs mt-2 font-mono">
                    {product?.district}
                  </p>
                </div>
              </div>
            </div>
             })
          }
        </div>
      )}
    </>
  );
};

export default Card;
