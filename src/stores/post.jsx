import { create } from "zustand";
import { getPosts } from "../api/post";

const usePositionStore = create((set) => ({
  positions: [],

  loadPositions: async () => {
    try {
      const response = await getPosts();
      if (response && response.data) {
        const departement = response.data.map((dep) => {
          return {
            ...dep,
            department: dep.department ? dep.department.name : "N/A",
          };
        });

        console.log(departement)
        set({ positions: departement });
      }
    } catch (error) {
      console.error("Failed to load positions:", error);
    }
  },

  addPosition: (position) => {
    set((state) => ({
      positions: [...state.positions, position],
    }));
  },

  removePosition: (id_position) => {
    set((state) => ({
      positions: state.positions.filter(
        (pos) => pos.id_position !== id_position
      ),
    }));
  },

  updatePosition: (updatedPosition) => {
    set((state) => ({
      positions: state.positions.map((pos) =>
        pos.id_position === updatedPosition.id_position ? updatedPosition : pos
      ),
    }));
  },
}));

export default usePositionStore;
