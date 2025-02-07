import {ResponseCategory, getCategories} from '@/api/category';
import Toast from 'react-native-toast-message';
import {create} from 'zustand';

interface CategoryState {
  categories: ResponseCategory[];
  selectedCategories: number[];
  setCategories: (categories: ResponseCategory[]) => void;
  setSelectedCategories: (categoryIds: number[] | ((prev: number[]) => number[])) => void;
  fetchCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  selectedCategories: [],
  setCategories: (categories: ResponseCategory[]) => {
    set({categories});
  },
  setSelectedCategories: (categoryIds) => {
    set((state) => ({
      selectedCategories: typeof categoryIds === 'function' ? categoryIds(state.selectedCategories) : categoryIds,
    }));
  },
  fetchCategories: async () => {
    try {
      const data = await getCategories();
      set((state) => {
        const newSelectedCategories = data.map(category => category.categoryId);
        return {
          categories: data,
          selectedCategories: newSelectedCategories
        };
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: '데이터를 불러오는 데 실패했습니다. 다시 시도해주세요',
      });
    }
  },
}));

export default useCategoryStore;