import {colors} from '@/constants';
import {useEffect, useState} from 'react';
import {Animated, Easing, StyleSheet, TouchableOpacity} from 'react-native';

const Toggle = ({
  isEnabled,
  toggleSwitch,
}: {
  isEnabled: boolean;
  toggleSwitch: () => void;
}) => {
  const [animatedValue] = useState(new Animated.Value(isEnabled ? 1 : 0));
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isEnabled ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isEnabled, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 28],
  });

  const color = isEnabled ? colors.PRIMARY : colors.GRAY_400;
  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      style={[styles.toggleBackground, {backgroundColor: color}]}>
      <Animated.View
        style={{
          transform: [{translateX}],
          width: 20,
          height: 20,
          backgroundColor: colors.WHITE,
          borderRadius: 99,
        }}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  toggleBackground: {
    width: 52,
    height: 26,
    borderRadius: 20,
    justifyContent: 'center',
  },
});
export default Toggle;
