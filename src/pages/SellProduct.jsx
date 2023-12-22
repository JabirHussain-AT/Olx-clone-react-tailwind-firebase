import React, { useContext, useRef, useState } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SellProduct() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [district, setDistrict] = useState('');

  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const notify = () => toast.success("successfully added the product");
  const [districtState, setDistrictState] = useState(false);

  const productRef = useRef();
  const districtRef = useRef();

  const districtsInKerala = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    if (
      productName?.trim() === null ||
      productName?.trim() === "" ||
      category?.trim() === null ||
      category?.trim() === "" ||
      price?.trim() === null ||
      price?.trim() === undefined ||
      price?.trim() === "" ||
      image === null
    ) {
      console.log("in if");
      if (
        productName?.trim() === null &&
        category?.trim() === null &&
        price?.trim() === null
      ) {
        productRef.current.focus();
        setPriceState(true);
        setImageState(true);
        setTimeout(() => {
          setPriceState(false);
          setImageState(false);
        }, 3000);
      } else {
        console.log(image);
        if (
          productName === null ||
          productName.trim() === null ||
          productName.trim() === ""
        ) {
          console.log("empty product name")
        }
        if (
          category === null ||
          category?.trim() === null ||
          category?.trim() === ""
        ) {
          console.log("empty categoryname")
        }
        if (
          price === null ||
          price?.trim() === null ||
          price?.trim() === "" ||
          price === undefined
        ) {
          setPriceState(true);
          setTimeout(() => {
            setPriceState(false);
          }, 3000);
        }
        if (image === null || image === undefined) {
          setImageState(true);
          setTimeout(() => {
            setImageState(false);
          }, 3000);
        }
      }
      return;
    } else {
      console.log("in else");
      const verifiedPrice = Math.abs(price);
      const storageRef = ref(storage, `products/${image.name}`);
      uploadBytes(storageRef, image).then(({ metadata }) => {
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "products"), {
            userId: user.userId,
            productName,
            category,
            price: verifiedPrice,
            image: url,
            district,
            createdAt: date,
          })
            .then(() => {
              console.log("product added successfully");
              notify();
              setTimeout(()=>navigate('/'),2000)
            })
            .catch(() => {
              console.log("an error occured!");
            });
        });
      });
    }
  };

  return (
    <>
      <div className="container mx-auto pt-20">
      <Toaster position="top-center" />
        <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-600"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-600"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-600"
            >
              District
            </label>
            <select
              id="district"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              ref={districtRef}
              className={`mt-1 p-2 w-full border rounded-md ${
                districtState ? "border-red-500" : ""
              }`}
              required
            >
              <option value="" disabled>
                Select District
              </option>
              {districtsInKerala.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

export default SellProduct;
