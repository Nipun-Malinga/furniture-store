import { create } from 'zustand';

const useProduct = create((set) => ({
  products: [],
  setProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}));

export default useProduct;
