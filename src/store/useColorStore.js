import { create } from 'zustand';

const useColorStore = create((set) => ({
  color: '',
  setColor: (color) => set({ color: color }),
}));

export default useColorStore;
