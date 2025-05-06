import { create } from 'zustand';

const useRoom = create((set) => ({
  room: null,
  setRoom: (room) => set({ room: room }),
}));

export default useRoom;
