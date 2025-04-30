import { create } from 'zustand';

const useAngleStore = create((set) => ({
  angle: null,
  setAngle: (angle) => set({ angle: angle }),
}));

export default useAngleStore;
