import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomButton from '@/components/common/CustomButton';
import {colors} from '@/constants/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations} from '@/constants';

type AuthHomeScreenProps = {
  navigation: StackNavigationProp<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
  >;
};
const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>돈그랑땡을 시작하려면</Text>
        <Text style={styles.title}>본인 인증이 필요합니다.</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/logo.png')}></Image>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text="시작하기"
          onPress={() => navigation.navigate(authNavigations.JOIN)}
        />
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
export default AuthHomeScreen;
