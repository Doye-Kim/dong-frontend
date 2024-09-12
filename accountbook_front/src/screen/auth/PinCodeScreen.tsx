import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import PinPad from '../../components/auth/PinPad';
import {colors} from '../../constants';
import {useEffect, useState} from 'react';

const PinCodeScreen = () => {
  const [pin, setPin] = useState<number[]>([]);
  useEffect(() => {
    console.log(pin);
  }, [pin]);

  const renderCircles = () => {
    const totalCircles = 6;
    const filledCircles = pin.length;

    return (
      <View style={styles.circleContainer}>
        {Array.from({length: totalCircles}).map((_, index) => (
          <View
            key={index}
            style={[
              styles.circle,
              index < filledCircles ? styles.filledCircle : styles.emptyCircle,
            ]}
          />
        ))}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>간편 비밀번호를</Text>
        <Text style={styles.titleText}>설정해 주세요</Text>
        <Text style={styles.text}>로그인, 송금에 사용됩니다.</Text>
      </View>
      <View style={styles.inputContainer}>{renderCircles()}</View>
      <View style={styles.padContainer}>
        <PinPad setPin={setPin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  titleText: {
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
    fontSize: 28,
  },
  text: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 12,
    color: colors.BLACK,
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    flexDirection: 'row',
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  emptyCircle: {
    backgroundColor: colors.GRAY_400,
  },
  filledCircle: {
    backgroundColor: colors.PRIMARY,
  },
  padContainer: {
    flex: 2.5,
  },
});
export default PinCodeScreen;
