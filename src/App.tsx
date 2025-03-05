import React, { useState, useEffect } from "react";
import "./App.scss";
import cn from "classnames";
import { ProductList } from "./components/ProductList";
import { ModalAddProduct } from "./components/modalAddProduct";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import * as productsActions from "./features/productsSlice";

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(productsActions.init());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="container">
        <h1 className="title">Product App</h1>

        <div className="list-wrapper">
          {loading && <p className="loading">loading...</p>}

          {products.length === 0 && !error && !loading && (
            <p className="message">Your list is empty</p>
          )}

          {products.length > 0 && !error && !loading && <ProductList />}
        </div>

        <div className="inner">
          <button className="add-product" onClick={() => setIsOpen(true)}>
            Add product
          </button>
        </div>
      </div>

      <div
        className={cn("form-add-product", {
          open: isOpen,
        })}
      >
        <ModalAddProduct onClose={setIsOpen} />
        <div
          className={cn("overlay", {
            open: isOpen,
          })}
        ></div>
      </div>
    </div>
  );
};
