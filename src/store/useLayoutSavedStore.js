import { create } from 'zustand';

const useLayoutSavedStore = create((set) => ({
  savedLayout: null,
  setSavedLayout: (savedLayout) => set(() => ({ savedLayout: savedLayout })),
}));

export default useLayoutSavedStore;
