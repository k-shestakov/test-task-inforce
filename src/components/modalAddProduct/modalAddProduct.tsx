import React, { useState } from "react";
import "./modalAddProduct.scss";
import { useAppDispatch } from "../../store/hooks";
import { addProduct } from "../../features/productsSlice";

type Props = {
  onClose: (v: boolean) => void;
};

export const ModalAddProduct: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState("");

  const dispatch = useAppDispatch();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = {
      name,
      count,
      imageURL,
      size: {
        width,
        height,
      },
      weight: weight + "g",
    };

    dispatch(addProduct(product)).then((data) => {
      onClose(false);
    });
  };

  return (
    <div className="modal-add">
      <form onSubmit={submit}>
        <div className="modal-add__field modal-add__field--full">
          <h3 className="modal-add__subtitle">Product name</h3>
          <input
            type="text"
            placeholder="Product name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="modal-add__field">
          <h3 className="modal-add__subtitle">Countity</h3>
          <input type="number" onChange={(e) => setCount(+e.target.value)} />
        </div>

        <div className="modal-add__field modal-add__field--full">
          <h3 className="modal-add__subtitle">URL</h3>
          <input
            type="url"
            placeholder="Enter image URL"
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>

        <div className="modal-add__size">
          <h3 className="modal-add__subtitle">Enter size</h3>

          <div className="modal-add__fields">
            <div className="modal-add__field">
              <input
                type="number"
                placeholder="Width"
                onChange={(e) => setWidth(+e.target.value)}
              />
            </div>

            <div className="modal-add__field">
              <input
                type="number"
                placeholder="Height"
                onChange={(e) => setHeight(+e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="modal-add__field">
          <h3 className="modal-add__subtitle">Weight</h3>

          <input type="number" onChange={(e) => setWeight(e.target.value)} />
        </div>

        <div className="modal-add__options">
          <button
            type="reset"
            className="modal-add__btn modal-add__btn--cancel"
          >
            Cancel
          </button>

          <button type="submit" className="modal-add__btn modal-add__btn--add">
            Add
          </button>
        </div>
      </form>

      <button className="modal-add__close" onClick={() => onClose(false)}>
        X
      </button>
    </div>
  );
};
