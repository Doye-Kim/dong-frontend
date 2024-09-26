import axiosInstance from './axios';

export type ResponseCategory = {
  categoryId: number;
  name: string;
  categoryType: string; // DEFAULT | CUSTOM
  imageNumber: number;
};

const getCategories = async (): Promise<ResponseCategory[]> => {
  const {data} = await axiosInstance.get('/categories');
  return data;
};

export type RequestCategory = {
  categoryName: string;
  imageNumber: number;
};
const postCategory = async ({
  categoryName,
  imageNumber,
}: RequestCategory): Promise<void> => {
  const {data} = await axiosInstance.post('/categories', {
    categoryName,
    imageNumber,
  });
  return data;
};

const deleteCategory = async (categoryId: number) => {
  const {data} = await axiosInstance.delete(`/categories/${categoryId}`);
  return data;
};

const patchCategory = async (
  categoryId: number,
  {categoryName, imageNumber}: RequestCategory,
) => {
  const {data} = await axiosInstance.patch(`/categories/${categoryId}`, {
    categoryName,
    imageNumber,
  });
  return data;
};

export {getCategories, postCategory, deleteCategory, patchCategory};
