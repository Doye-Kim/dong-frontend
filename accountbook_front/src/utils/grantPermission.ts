import { PermissionsAndroid, Platform } from 'react-native';

const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: "이미지 접근 권한",
            message: "앱에서 이미지를 저장하기 위해 접근 권한이 필요합니다.",
            buttonNeutral: "나중에 묻기",
            buttonNegative: "거부",
            buttonPositive: "허용"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('미디어 이미지 권한 허용');
          return true;
        } else {
          console.log('미디어 이미지 권한 거절');
          return false;
        }
      } else {
        const granted = await PermissionsAndroid.requestMultiple(
          [
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ],
          {
            title: "저장소 접근 권한",
            message: "앱에서 이미지를 저장하기 위해 저장소 접근 권한이 필요합니다.",
            buttonNeutral: "나중에 묻기",
            buttonNegative: "거부",
            buttonPositive: "허용"
          }
        );
        if (
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('저장소 권한 허용');
          return true;
        } else {
          console.log('저장소 권한 거절');
          return false;
        }
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // iOS의 경우 true 반환
};

export { requestStoragePermission };