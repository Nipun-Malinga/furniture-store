import { create } from 'zustand';

const useCoordinatesStore = create((set) => ({
  coordinates: [],
  setCoordinates: (newCoordinate) =>
    set((state) => {
      const exists = state.coordinates.find((c) => c.modelId === newCoordinate.modelId);
      if (exists) {
        return {
          coordinates: state.coordinates.map((c) =>
            c.modelId === newCoordinate.modelId ? newCoordinate : c
          ),
        };
      } else {
        return {
          coordinates: [...state.coordinates, newCoordinate],
        };
      }
    }),

  clearCoordinates: () => set(() => ({ coordinates: [] })),
}));

export default useCoordinatesStore;
