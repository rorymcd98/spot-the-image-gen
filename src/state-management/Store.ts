import { create } from 'zustand';
import paintingsLibrary from '../resources/paintingsLibrary';

import { persist, createJSONStorage } from 'zustand/middleware';

type PaintingProgress = {
  differenceIds: Record<string, boolean>;
  timeSpent_seconds: number;
  isComplete: boolean;
};

type PaintingsProgressStore = {
  paintings: Record<string, PaintingProgress>;
  clickDifference: (paintingName: string, differenceId: string) => void;
  incrementTime: (paintingName: string) => void;
  resetPainting: (paintingName: string) => void;
  resetAllPaintings: () => void;
};

const initialPaintings: Record<string, PaintingProgress> = {};

Object.keys(paintingsLibrary).forEach((paintingId) => {
  initialPaintings[paintingId] = {
    differenceIds: {},
    timeSpent_seconds: 0,
    isComplete: false,
  };
});

const updatePaintings = (state: PaintingsProgressStore) => {
  Object.keys(paintingsLibrary).forEach((paintingId) => {
    if (!state.paintings[paintingId]) {
      state.paintings[paintingId] = {
        differenceIds: {},
        timeSpent_seconds: 0,
        isComplete: false,
      };
    }
  });
};

export const useProgressStore = create<PaintingsProgressStore>()(
  persist(
    (set) => ({
      // Call updatePaintings here to ensure new paintings are added to the state
      paintings: initialPaintings,
      clickDifference: (paintingName: string, differenceId: string) =>
        set((state) => {
          const painting = state.paintings[paintingName];

          if (!painting) {
            state.paintings[paintingName] = {
              differenceIds: {},
              timeSpent_seconds: 0,
              isComplete: false,
            };
          }

          state.paintings[paintingName].differenceIds[differenceId] = true;
          if (
            Object.keys(state.paintings[paintingName].differenceIds).length ===
            paintingsLibrary[paintingName].totalDiffs
          ) {
            state.paintings[paintingName].isComplete = true;
          }

          return { ...state };
        }),

      incrementTime: (paintingName) =>
        set((state) => {
          const painting = state.paintings[paintingName];

          if (!painting) {
            state.paintings[paintingName] = {
              differenceIds: {},
              timeSpent_seconds: 0,
              isComplete: false,
            };
          }

          state.paintings[paintingName].timeSpent_seconds += 1;

          return { ...state };
        }),

      resetPainting: (paintingName: string) =>
        set((state) => {
          state.paintings[paintingName] = {
            differenceIds: {},
            timeSpent_seconds: 0,
            isComplete: false,
          };

          return { ...state };
        }),

      resetAllPaintings: () =>
        set((state) => {
          Object.keys(state.paintings).forEach((paintingName) => {
            state.paintings[paintingName] = {
              differenceIds: {},
              timeSpent_seconds: 0,
              isComplete: false,
            };
          });

          return { ...state };
        }),
    }),
    {
      name: 'paintings-progress', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      onRehydrateStorage: (state) => updatePaintings(state), // (optional) callback that is called once the store is rehydrated from the storage
    }
  )
);

type PaintingNameStore = {
  paintingName: string;
  setPaintingName: (newPaintingName: string) => void;
};

export const usePaintingNameStore = create<PaintingNameStore>()(
  persist(
    (set) => ({
      paintingName: 'sunday-afternoon',
      setPaintingName: (newPaintingName) =>
        set(() => ({ paintingName: newPaintingName })),
    }),
    {
      name: 'painting-name',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

type ThemeStore = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

type KnowsZoomStore = {
  knowsZoom: boolean;
  setKnowsZoom: (knowsZoom: boolean) => void;
};

export const useKnowsZoomStore = create<KnowsZoomStore>()(
  persist(
    (set) => ({
      knowsZoom: false,
      setKnowsZoom: (knowsZoom) => set(() => ({ knowsZoom })),
    }),
    {
      name: 'knows-zoom',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
