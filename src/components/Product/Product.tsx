import React from "react";
import "./Product.scss";
import { Product as ProductInfo } from "../../types/Product";
import { useAppDispatch } from "../../store/hooks";
import { deleteProduct } from "../../features/productsSlice";

type Props = {
  product: ProductInfo;
};

export const Product: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <article className="product">
      <div className="product__content">
        <div className="product__inner">
          <div className="product__image">
            <img src={product.imageURL} alt="Content Image" />
          </div>
          <h3 className="product__title">{product.name}</h3>
        </div>

        <button
          className="product__delete"
          onClick={() => dispatch(deleteProduct(product.id))}
        >
          Delete
        </button>
      </div>

      <div className="product__info">
        <p className="product__count">Countity: {product.count}</p>
        <div className="product__size">
          <div className="product__width">Width: {product.size.width}</div>
          <div className="product__height">Height: {product.size.height}</div>
        </div>

        <p className="product__weight">Weight: {product.weight}</p>
      </div>
    </article>
  );
};
