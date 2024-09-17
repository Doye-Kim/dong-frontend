import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants';

const ConnectAssetsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>연결된 계좌를 불러와야</Text>
        <Text style={styles.title}>돈그랑땡을 사용할 수 있어요!</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/logo.png')}></Image>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="계좌 연결" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 50,
  },
  imageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: colors.BLACK,
    fontFamily: 'Pretendard-Bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default ConnectAssetsScreen;
