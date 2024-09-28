import {PeriodOptions} from '@/api/seed';
import {colors} from '@/constants';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const period: Record<PeriodOptions, string> = {
  DAILY: '매일',
  WEEKLY: '매주',
  MONTHLY: '매달',
};

interface DropdownMenuProps {
  isVisible: boolean;
  onSelect: (period: PeriodOptions) => void;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isVisible,
  onSelect,
  onClose,
}: DropdownMenuProps) => {
  if (!isVisible) return null;

  return (
    <View style={styles.dropdownMenu}>
      {Object.keys(period).map(key => {
        const periodKey = key as PeriodOptions;
        return (
          <TouchableOpacity
            key={periodKey}
            style={styles.dropdownItem}
            onPress={() => {
              onSelect(periodKey);
              onClose();
            }}>
            <Text style={styles.dropdownText}>{period[periodKey]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    right: -5,
    width: 150,
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
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
    color: colors.BLACK,
  },
});

export default DropdownMenu;
