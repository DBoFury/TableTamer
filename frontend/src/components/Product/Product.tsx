import { Typography } from "@mui/material";
import "./Product.css";

interface ProductPropsType {
  title: string;
  description: string | null;
  imageUrl: string;
  price: number;
  isInStoplist: boolean;
}

const Product = ({
  title,
  description,
  imageUrl,
  price,
  isInStoplist,
}: ProductPropsType) => {
  return (
    <div className="product-container">
      {imageUrl && <img src={imageUrl} />}
      <div className="product-content">
        <div className="product-title-description">
          <Typography>
            <b>Title: </b>
            {title}
          </Typography>
          <Typography>
            <b>Description: </b>
            {description}
          </Typography>
        </div>
        <Typography>
          <b>Price per unit: </b>
          {price}
        </Typography>
      </div>
    </div>
  );
};

export default Product;
