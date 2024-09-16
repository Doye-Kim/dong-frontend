import {colors} from '@/constants';
import {Dimensions, StyleSheet, View} from 'react-native';

const Divider = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    width: Dimensions.get('screen').width,
    height: 8,
    marginVertical: 10,
    backgroundColor: colors.GRAY_200,
  },
});

export default Divider;
