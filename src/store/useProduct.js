import { create } from 'zustand';

const useProduct = create((set) => ({
  products: [],
  setProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((p) => p.productId !== productId),
    })),
}));

export default useProduct;
