import {colors} from '@/constants';
import {Image, StyleSheet, Text, View} from 'react-native';

const CategoryComparisonHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../../assets/bell.png')} style={styles.image} />
      <Text style={styles.text}>
        7월보다
        <Text style={styles.accentText}> 98만원 덜 </Text>
        썼어요{' '}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  text: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: colors.BLACK,
    marginVertical: 10,
  },
  accentText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    color: colors.RED_500,
  },
});
export default CategoryComparisonHeader;
