import {colors} from '@/constants';
import {category} from '@/utils/categories';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

interface DropdownCategoryProps {
  isVisible: boolean;
  onSelect: (category: Record<number, string>) => void;
  onClose: () => void;
}

const DropdownCategory: React.FC<DropdownCategoryProps> = ({
  isVisible,
  onSelect,
  onClose,
}: DropdownCategoryProps) => {
  if (!isVisible) return null;

  return (
    <ScrollView style={styles.dropdownMenu}>
      {Object.keys(category)
        .slice(1)
        .map(key => {
          const categoryKey = key;
          return (
            <TouchableOpacity
              key={categoryKey}
              style={styles.dropdownItem}
              onPress={() => {
                onSelect(categoryKey);
                onClose();
              }}>
              <Text style={styles.dropdownText}>{category[categoryKey]}</Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdownMenu: {
    position: 'absolute',
    bottom: 80,
    height: 200,
    left: 10,
    width: Dimensions.get('window').width - 60,
    backgroundColor: colors.WHITE,
    borderRadius: 25,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  dropdownText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    color: colors.BLACK,
  },
});

export default DropdownCategory;
