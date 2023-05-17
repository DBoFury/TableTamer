import { useSelector } from "react-redux";
import { AppState, CategoryType } from "../../stores/types";
import "./ProductCategoriesNavBar.css";

interface ProductCategoriesNavBarPropsType {
  setSelectedCategory: (category: CategoryType | null) => void;
}

const ProductCategoriesNavBar = ({
  setSelectedCategory,
}: ProductCategoriesNavBarPropsType) => {
  const categories: CategoryType[] | null = useSelector(
    (state: AppState) => state.categories
  );

  return (
    <div className="categories-nav-container">
      <button onClick={() => setSelectedCategory(null)}>All</button>
      {categories?.map((category) => (
        <button
          onClick={() => setSelectedCategory(category)}
          key={category.title}>
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default ProductCategoriesNavBar;
