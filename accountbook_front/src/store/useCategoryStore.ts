import {ResponseCategory, getCategories} from '@/api/category';
import Toast from 'react-native-toast-message';
import {create} from 'zustand';

interface CategoryState {
  categories: ResponseCategory[];
  setCategories: (categories: ResponseCategory[]) => void;
  fetchCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryState>(set => ({
  categories: [],
  setCategories: (categories: ResponseCategory[]) => {
    set({categories});
  },
  fetchCategories: async () => {
    try {
      const data = await getCategories();
      set({categories: data});
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: '데이터를 불러오는 데 실패했습니다. 다시 시도해주세요',
      });
    }
  },
}));

export default useCategoryStore;
