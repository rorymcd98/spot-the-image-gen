import { create } from "zustand";
import paintingsJson from "../resources/paintings.json";
const initialPaintings: {[key: string]: {}} = {};

Object.keys(paintingsJson).forEach((paintingId) => {
  initialPaintings[paintingId] = {};
  }
);



type PaintingsProgress = {
  paintings: {[key: string]: {
    [key: string]: boolean
  }},
  clickDifference: (paintingId: string, differenceId: string) => void,
}

export const useProgressStore = create<PaintingsProgress>((set) => ({
  paintings: initialPaintings,
  clickDifference: (paintingName: string, differenceId: string) => set((state) => {
    const painting = state.paintings[paintingName];
    
    if (!painting) {
      state.paintings[paintingName] = {};
    }
    state.paintings[paintingName][differenceId] = true;

    return {...state};
  }),

}));



type ClickCounter = {
  clicks: number,
  increment: () => void,
  reset: () => void,
}

export const useClickCounter = create<ClickCounter>((set) => ({
  clicks: 0,
  increment: () => set((state) => ({ clicks: state.clicks + 1 })),
  reset: () => set({ clicks: 0 })
}));