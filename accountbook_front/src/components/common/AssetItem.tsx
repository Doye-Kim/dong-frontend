import {AccountIcon, CardIcon} from '@/assets/icons';
import {colors} from '@/constants';
import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AssetItem = ({
  title,
  info,
  assetOrCard,
}: {
  title: string;
  info: string;
  assetOrCard: boolean;
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, checked && styles.checked]}
      onPress={() => {
        setChecked(prev => !prev);
      }}>
      {assetOrCard ? (
        <AccountIcon width={30} height={30} />
      ) : (
        <CardIcon width={30} height={30} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{info}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 20,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checked: {
    backgroundColor: colors.ORANGE_200,
  },
  icon: {
    width: 30,
    height: 30,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    color: colors.BLACK,
  },
  info: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    color: colors.GRAY_800,
  },
});
export default AssetItem;
