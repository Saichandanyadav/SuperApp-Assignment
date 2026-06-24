import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CategoryState {
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  clearCategories: () => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      selectedCategories: [],
      toggleCategory: (category) =>
        set((state) => ({
          selectedCategories: state.selectedCategories.includes(category)
            ? state.selectedCategories.filter((c) => c !== category)
            : [...state.selectedCategories, category],
        })),
      clearCategories: () => set({ selectedCategories: [] }),
    }),
    {
      name: 'superapp-category-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);