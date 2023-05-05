import { create } from "zustand";


type PaintingsProgress = {
  paintings: {[key: string]: {
    [key: string]: boolean
  }},
  clickedDifference: (paintingId: string, differenceId: string) => void,
}

export const useProgressStore = create<PaintingsProgress>((set) => ({
  paintings: {} ,
  clickedDifference: (paintingId: string, differenceId: string) => set((state) => {
    const painting = state.paintings[paintingId];
    
    if (painting) {
      painting[differenceId] = true;

    }
    return {...state};
  })

}));