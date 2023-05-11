import { create } from "zustand";
import paintingsLibrary from "../resources/paintingsLibrary";

type PaintingProgress = {
  'differenceIds': {
    [key: string]: boolean
  }, 
  'timeSpent_seconds': number,
  isComplete: boolean,
}

type PaintingsProgressStore = {
  paintings: {[key: string]: PaintingProgress},
  clickDifference: (paintingId: string, differenceId: string) => void,
}

const initialPaintings: {[key: string]: PaintingProgress} = {};

Object.keys(paintingsLibrary).forEach((paintingId) => {
  initialPaintings[paintingId] = {
    differenceIds: {},
    timeSpent_seconds: 0,
    isComplete: false
  };
  }
);

export const useProgressStore = create<PaintingsProgressStore>((set) => ({
  paintings: initialPaintings,
  clickDifference: (paintingName: string, differenceId: string) => set((state) => {
    const painting = state.paintings[paintingName];
    
    if (!painting) {
      state.paintings[paintingName] = {
        'differenceIds': {},
        'timeSpent_seconds': 0,
        isComplete: false
      };
    }

    state.paintings[paintingName].differenceIds[differenceId] = true;

    return {...state};
  }),

}));


type ClickCounterStore = {
  clicks: number,
  increment: () => void,
  reset: () => void,
}

export const useClickCounterStore = create<ClickCounterStore>((set) => ({
  clicks: 0,
  increment: () => set((state) => ({ clicks: state.clicks + 1 })),
  reset: () => set({ clicks: 0 })
}));


type ClockStore = {
  time_seconds: number,
  incrementTime: () => void,
  setTime: (newTime: number) => void,
}

export const useClockStore = create<ClockStore>((set) => ({
  time_seconds: 0,
  incrementTime: () => set((state) => ({ time_seconds: state.time_seconds + 1 })),
  setTime: (newTime) => set(() => ({ time_seconds: newTime })),
}));


type PaintingNameStore = {
  paintingName: string,
  setPaintingName: (newPaintingName: string) => void,
}

export const usePaintingNameStore = create<PaintingNameStore>((set) => ({
  paintingName: 'sunday-afternoon',
  setPaintingName: (newPaintingName) => set(() => ({ paintingName: newPaintingName })),
}));