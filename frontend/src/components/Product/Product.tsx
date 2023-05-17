import { CategoryType } from "../../stores/types";
import "./Product.css";

interface ProductPropsType {
  title: string;
  description: string | null;
  imageUrl: string;
  price: number;
  slug: string;
  isInStoplist: boolean;
  category: CategoryType;
  handleItemIncrease: (slug: string) => void;
  handleItemDecrease: (slug: string) => void;
}

const Product = ({
  title,
  description,
  imageUrl,
  price,
  slug,
  isInStoplist,
  category,
  handleItemIncrease,
  handleItemDecrease,
}: ProductPropsType) => {
  return (
    <div className="product-container">
      <img src={imageUrl} />
      <div className="product-content">
        <div className="product-title-description">
          <p>{title}</p>
          <p>{description}</p>
        </div>
        <p>{price}</p>
        <p>{category.title}</p>
      </div>
      <div className="product-amount-change">
        <button onClick={() => handleItemIncrease(slug)}>+</button>
        <button onClick={() => handleItemDecrease(slug)}>-</button>
      </div>
    </div>
  );
};

export default Product;
