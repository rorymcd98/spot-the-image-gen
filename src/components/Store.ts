import { create } from "zustand";


type PaintingsProgress = {
  paintings: {[key: string]: {
    [key: string]: boolean
  }},
  clickedDifference: (paintingId: string, differenceId: string) => void,
}

export const useProgressStore = create<PaintingsProgress>((set) => ({
  paintings: {},
  clickedDifference: (paintingName: string, differenceId: string) => set((state) => {
    const painting = state.paintings[paintingName];
    
    if (!painting) {
      state.paintings[paintingName] = {};
    }
    state.paintings[paintingName][differenceId] = true;

    return {...state};
  }),

}));

type StyleUpdateState = {
  updateStyles: boolean;
  toggleUpdateStyles: () => void;
};

export const useStyleUpdateStore = create<StyleUpdateState>((set) => ({
  updateStyles: false,
  toggleUpdateStyles: () => set((state) => ({ updateStyles: !state.updateStyles })),
}));