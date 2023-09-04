import { Fragment } from "react";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { useSelector } from "react-redux";

const CategoriesPreview = () => {
  const categories = useSelector((store) => store.categories.categoriesMap);
  // const { categories } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categories).map((key) => {
        const products = categories[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
