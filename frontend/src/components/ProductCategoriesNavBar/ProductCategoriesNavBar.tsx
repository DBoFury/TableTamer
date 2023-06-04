import { useSelector } from "react-redux";
import { AppState, CategoryType } from "../../stores/types";
import { Button } from "@mui/material";
import "./ProductCategoriesNavBar.css";

interface ProductCategoriesNavBarPropsType {
  selectedCategory: CategoryType | null;
  setSelectedCategory: (category: CategoryType | null) => void;
}

const ProductCategoriesNavBar = ({
  selectedCategory,
  setSelectedCategory,
}: ProductCategoriesNavBarPropsType) => {
  const categories: CategoryType[] | null = useSelector(
    (state: AppState) => state.categories
  );

  return (
    <div className="categories-nav-container">
      <Button
        onClick={() => setSelectedCategory(null)}
        sx={{
          fontWeight: "bold",
          color: selectedCategory === null ? "#ffffff" : "#ffffff",
          backgroundColor: selectedCategory === null ? "#5c6ac4" : "#545e6f",
        }}>
        All
      </Button>
      {categories?.map((category) => (
        <Button
          key={category.title}
          onClick={() => setSelectedCategory(category)}
          sx={{
            fontWeight: "bold",
            color:
              selectedCategory?.title === category.title
                ? "#ffffff"
                : "#545e6f",
            backgroundColor:
              selectedCategory?.title === category.title ? "#5c6ac4" : "",
          }}>
          {category.title}
        </Button>
      ))}
    </div>
  );
};

export default ProductCategoriesNavBar;
