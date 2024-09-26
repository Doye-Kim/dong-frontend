import React, {useCallback, useRef} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import InputField from '@/components/auth/InputField';
import {colors} from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import useForm from '@/hooks/useForm';
import {validateJoin} from '@/utils/validate';
import {postPhoneAuth, postSignup} from '@/api/auth';
import {setEncryptStorage} from '@/utils/encryptedStorage';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNavigations} from '@/constants';

type AuthHomeScreenProps = {
  navigation: StackNavigationProp<
    AuthStackParamList,
    typeof authNavigations.AUTH_HOME
  >;
};
const JoinScreen = ({navigation}: AuthHomeScreenProps) => {
  // FCM
  const getFcmToken = useCallback(async () => {
    const data = await messaging().getToken();
    // console.log('fcm', data);
    return data;
  }, []);

  const phoneRef = useRef<TextInput | null>(null);
  const phoneAuthRef = useRef<TextInput | null>(null);

  const join = useForm({
    initialValue: {name: '', phone: '', phoneAuthPassword: ''},
    validate: validateJoin,
  });
  const handlePressPhoneAuth = async () => {
    try {
      const data = await postPhoneAuth(join.values.phone);
      console.log(data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const handleSubmit = async () => {
    const {name, phone, phoneAuthPassword} = join.values;
    const fcmTokenKey = await getFcmToken();
    console.log(fcmTokenKey);
    try {
      const data = await postSignup({
        name,
        phone,
        phoneAuthPassword,
        fcmTokenKey,
      });
      console.log(data);
      await setEncryptStorage('user', JSON.stringify(data));
      navigation.navigate(authNavigations.PIN, {pageNumber: 1});
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <InputField
          autoFocus
          placeholder="이름을 입력해주세요"
          error={join.errors.name}
          touched={join.touched.name}
          inputMode="text"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => phoneRef.current?.focus()}
          {...join.getTextInputProps('name')}
        />
        <View style={styles.authContainer}>
          <View style={styles.numberContainer}>
            <InputField
              ref={phoneRef}
              placeholder="전화번호를 입력해주세요"
              error={join.errors.phone}
              touched={join.touched.phone}
              inputMode="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={() => phoneAuthRef.current?.focus()}
              {...join.getTextInputProps('phone')}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePressPhoneAuth}>
            <Text style={styles.buttonText}>인증번호 받기</Text>
          </TouchableOpacity>
        </View>
        <InputField
          ref={phoneAuthRef}
          placeholder="인증번호를 입력해주세요"
          error={join.errors.phoneAuthPassword}
          touched={join.touched.phoneAuthPassword}
          inputMode="numeric"
          returnKeyType="join"
          blurOnSubmit={false}
          {...join.getTextInputProps('phoneAuthPassword')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="확인" onPress={handleSubmit} />
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
  formContainer: {
    gap: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: colors.ORANGE_200,
    width: 110,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginLeft: 10,
  },
  buttonText: {
    color: colors.PRIMARY,
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
  },
  authContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberContainer: {
    flex: 1,
    minHeight: 50,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default JoinScreen;
