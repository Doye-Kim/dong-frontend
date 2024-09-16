import {colors} from '@/constants';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const Category = ({
  name,
  categoryId,
  selectedCategoryId,
  setSelectedCategoryId,
}: {
  name: string;
  categoryId: number;
  selectedCategoryId: number;
  setSelectedCategoryId: (selectedCategoryId: number) => void;
}) => {
  const handleCategoryPress = () => {
    setSelectedCategoryId(categoryId);
  };
  const containerStyle = [
    styles.container,
    {
      backgroundColor:
        selectedCategoryId === categoryId ? colors.BLACK : colors.GRAY_200,
    },
  ];
  const textStyle = [
    styles.text,
    {
      color: selectedCategoryId === categoryId ? colors.WHITE : colors.GRAY_500,
    },
  ];
  return (
    <TouchableOpacity style={containerStyle} onPress={handleCategoryPress}>
      <Text style={textStyle}>{name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    margin: 2,
    minWidth: 45,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  text: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 13,
  },
});
export default Category;
