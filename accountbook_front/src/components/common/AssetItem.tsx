import {colors} from '@/constants';
import {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
        <Image
          source={require('@/assets/accountIcon.png')}
          style={styles.icon}
        />
      ) : (
        <Image source={require('@/assets/cardIcon.png')} style={styles.icon} />
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
