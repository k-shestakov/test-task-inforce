import React from "react";
import "./ProductList.scss";
import { Product } from "../Product/";
import { useAppSelector } from "../../store/hooks";

export const ProductList: React.FC = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <div className="product-list">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};
