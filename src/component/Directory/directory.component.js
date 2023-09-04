import React from "react";
import DirectoryItem from "./category-item/directory-item.component";
import "./directory.style.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories &&
        categories.map((item) => {
          return <DirectoryItem category={item} />;
        })}
    </div>
  );
};

export default Directory;
