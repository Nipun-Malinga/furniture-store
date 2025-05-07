import { create } from 'zustand';

const useProduct = create((set) => ({
  products: [],
  setProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  removeProduct: (modelId) =>
    set((state) => ({
      products: state.products.filter((p) => p.modelId !== modelId),
    })),
}));

export default useProduct;
