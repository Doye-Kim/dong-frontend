import React, {ForwardedRef, forwardRef, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';
import {colors} from '../../constants';
import {mergeRefs} from '../../utils';

// import {mergeRefs} from '@/utils';
interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;
const InputField = forwardRef(
  (
    {disabled = false, error, touched, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);
    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <TextInput
            editable={!disabled}
            placeholderTextColor={colors.GRAY_500}
            style={(styles.input, disabled && styles.disabled)}
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            ref={ref ? mergeRefs(innerRef, ref) : innerRef}
            {...props}
          />
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    height: 60,
    marginBottom: 50,
    borderColor: colors.GRAY_400,
    padding: deviceHeight > 700 ? 8 : 5,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    color: colors.BLACK,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.GRAY_200,
    color: colors.GRAY_700,
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.RED_300,
    padding: deviceHeight > 700 ? 8 : 5,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
