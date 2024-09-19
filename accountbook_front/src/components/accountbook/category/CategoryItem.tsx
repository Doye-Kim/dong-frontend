import {CategoryAdd} from '@/assets/icons';
import CategoryIcon from '@/components/common/CategoryIcon';
import {colors} from '@/constants';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryEditModal from './CategoryEditModal';
import ActionModal from './ActionModal';
import DefaultAlert from './DefaultAlert';

interface categoryItemProps {
  item: {
    category_id: number;
    category_name: string;
    image_number: number;
    default: boolean;
  };
}
const CategoryItem = ({item}: categoryItemProps) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [defaultAlertVisible, setDefaultAlertVisible] = useState(false);
  const onPress = (item: categoryItemProps) => {
    if (item.category_id === -1) {
      setModalData(null);
      setIsEditModalVisible(true);
      setIsActionModalVisible(false);
    }
  };

  const onLongPress = (item: categoryItemProps) => {
    if (item.category_id !== -1) {
      if (item.default) {
        setDefaultAlertVisible(true);
        setTimeout(() => {
          setDefaultAlertVisible(false);
        }, 2000);
      } else {
        setIsEditModalVisible(true);
        setIsActionModalVisible(false);
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
          {item.category_id < 0 ? (
            <CategoryAdd width={35} height={35} />
          ) : (
            <CategoryIcon categoryNumber={item.category_id} size={35} />
          )}
        </View>
        <Text style={styles.name}>{item.category_name}</Text>
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
          onClose={() => setIsActionModalVisible(false)}
          data={modalData}
          onEdit={() => setIsEditModalVisible(true)}
        />
      )}
      {defaultAlertVisible && <DefaultAlert isVisible={defaultAlertVisible} />}
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
