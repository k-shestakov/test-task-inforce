import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../types/PoductState";
import { Product } from "../types/Product";

export const init = createAsyncThunk<Product[], void>("products/fetch", () => {
  return fetch("http://localhost:5000/products").then((response) => {
    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    return response.json();
  });
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  (newProduct: Omit<Product, "id">) => {
    return fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then((response) => response.json());
  }
);

export const deleteProduct = createAsyncThunk(
  "products/removeProduct",
  (productId: number) => {
    return fetch(`http://localhost:5000/products/${productId}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Delete failed");
      }
      return productId;
    });
  }
);

const initialState: ProductState = {
  products: [],
  loading: false,
  error: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
  },
});

export default productSlice.reducer;
