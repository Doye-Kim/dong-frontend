import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputField from '../../components/auth/InputField';
import {colors} from '../../constants';
import CustomButton from '../../components/common/CustomButton';

const JoinScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <InputField
          autoFocus
          placeholder="이름을 입력해주세요"
          //   error={signup.errors.email}
          //   touched={signup.touched.email}
          inputMode="text"
          returnKeyType="next"
          blurOnSubmit={false}
          //   onSubmitEditing={() => passwordRef.current?.focus()}
          //   {...signup.getTextInputProps('email')}
        />
        <View style={styles.authContainer}>
          <View style={styles.numberContainer}>
            <InputField
              autoFocus
              placeholder="전화번호를 입력해주세요"
              //   error={signup.errors.email}
              //   touched={signup.touched.email}
              inputMode="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
              //   onSubmitEditing={() => passwordRef.current?.focus()}
              //   {...signup.getTextInputProps('email')}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>인증번호 받기</Text>
          </TouchableOpacity>
        </View>
        <InputField
          autoFocus
          placeholder="인증번호를 입력해주세요"
          //   error={signup.errors.email}
          //   touched={signup.touched.email}
          inputMode="numeric"
          returnKeyType="next"
          blurOnSubmit={false}
          //   onSubmitEditing={() => passwordRef.current?.focus()}
          //   {...signup.getTextInputProps('email')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton text="확인" />
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
