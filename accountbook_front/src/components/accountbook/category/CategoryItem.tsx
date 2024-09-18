import {CategoryAdd} from '@/assets/icons';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryEditModal from './CategoryEditModal';

interface categoryItemProps {
  item: {
    category_id: number;
    category_name: string;
    image_number: number;
    default: boolean;
  };
}
const CategoryItem = ({item}: categoryItemProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const onPress = (item: {
    category_id: number;
    category_name: string;
    image_number: number;
    default: boolean;
  }) => {
    if (item.category_id === -1) {
      setModalData(null);
      setModalVisible(true);
    } else if (!item.default) {
      setModalData(item);
      setModalVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => onPress(item)} style={styles.container}>
        <View style={styles.icon}>
          {item.category_id < 0 ? (
            <CategoryAdd width={35} height={35} />
          ) : (
            <CategoryIcon categoryNumber={item.category_id} size={35} />
          )}
        </View>
        <Text style={styles.name}>{item.category_name}</Text>
      </TouchableOpacity>
      {isModalVisible && (
        <CategoryEditModal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          data={modalData}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
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
    color: colors.BLACK,
  },
});

export default CategoryItem;
