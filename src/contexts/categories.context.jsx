import { createContext, useState, useEffect } from "react";
//import { addCollectionAndDocuments } from "../utils/firebase.js";
import { getCategoriesAndDocuments } from "../utils/firebase.js";

export const CategoriesContext = createContext({
  categories: {},
  setCategories: () => null
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});
  const value = { categories, setCategories };

  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategories(categoriesMap);
      // console.log(categoriesMap);
    };

    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
