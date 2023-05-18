import { CategoryType } from "../../stores/types";
import "./Product.css";

interface ProductPropsType {
  title: string;
  description: string | null;
  imageUrl: string;
  price: number;
  isInStoplist: boolean;
  category: CategoryType;
}

const Product = ({
  title,
  description,
  imageUrl,
  price,
  isInStoplist,
  category,
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
    </div>
  );
};

export default Product;
