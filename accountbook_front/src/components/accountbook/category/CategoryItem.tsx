import {CategoryAdd} from '@/assets/icons';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryEditModal from './CategoryEditModal';
import ActionModal from './ActionModal';
import {ResponseCategory} from '@/api/category';
import Toast from 'react-native-toast-message';
import useThemeStore from '@/store/useThemeStore';

type CategoryItemProps = {
  item: ResponseCategory;
  onCategorySelect?: (
    categoryId: number,
    categoryName: string,
    categoryImageNumber?: number,
  ) => void; // 추가
};

const CategoryItem = ({item, onCategorySelect}: CategoryItemProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [modalData, setModalData] = useState<ResponseCategory | null>(null);

  const onPress = (item: ResponseCategory) => {
    if (item.categoryId === -1) {
      // console.log('추가');
      setModalData(null);
      setIsEditModalVisible(true);
      setIsActionModalVisible(false);
    } else if (onCategorySelect) {
      onCategorySelect(item.categoryId, item.name, item.imageNumber);
    }
  };

  const onLongPress = (item: ResponseCategory) => {
    if (item.categoryId !== -1) {
      if (item.categoryType === 'DEFAULT') {
        Toast.show({
          type: 'error',
          text1: '기본 카테고리는 수정/삭제 할 수 없어요',
        });
      } else {
        setModalData(item);
        setIsEditModalVisible(false);
        setIsActionModalVisible(true);
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        onLongPress={() => onLongPress(item)}
        onPress={() => onPress(item)}
        style={styles.container}>
        <View style={styles.icon}>
          {item.categoryId < 0 ? (
            <CategoryAdd width={35} height={35} />
          ) : (
            <CategoryIcon categoryNumber={item.imageNumber} size={35} />
          )}
        </View>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      {isEditModalVisible && (
        <CategoryEditModal
          isVisible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          data={modalData}
        />
      )}
      {isActionModalVisible && (
        <ActionModal
          isVisible={isActionModalVisible}
          onClose={() => {
            setIsActionModalVisible(false);
            setIsEditModalVisible(false);
          }}
          categoryId={item.categoryId}
          onEdit={() => setIsEditModalVisible(true)}
        />
      )}
    </>
  );
};
const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
    },
    icon: {
      marginBottom: 5,
    },
    name: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 14,
      color: colors[theme].BLACK,
    },
  });

export default CategoryItem;
