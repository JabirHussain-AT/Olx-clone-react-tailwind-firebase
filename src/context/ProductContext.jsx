import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ProductContext = createContext();

export default function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (productsData.length > 0) {
          setData(productsData);
          setLoading(false);
          setError(null);
        } else {
          throw new Error('Data not available in Firebase');
        }
      } catch (error) {
        console.error('Error loading data from Firebase:', error);
        setError(null); // Clear previous error
      }
    };
    fetchDataFromFirebase()
  }, [limit]);

  const incrementLimit = () => {
    setLimit((prevLimit) => prevLimit + 8);
    setLoading(true);
  };

  return (
    <ProductContext.Provider value={{ data, loading, error, incrementLimit }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useData = () => useContext(ProductContext);
