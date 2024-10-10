import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {colors} from '@/constants';
import Barcode from '@adrianso/react-native-barcode-builder';
import ViewShot from 'react-native-view-shot'; // ViewShot 추가
import RNFS from 'react-native-fs'; // RNFS 추가
import {requestStoragePermission} from '@/utils/grantPermission';
import useThemeStore from '@/store/useThemeStore';

interface BarcodeModalProps {
  visible: boolean;
  barcodeNumber: string;
  onDismiss: () => void;
}

const BarcodeModal = ({
  visible,
  barcodeNumber,
  onDismiss,
}: BarcodeModalProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const barcodeRef = useRef(null);

  const handleSaveImage = async () => {
    const granted = await requestStoragePermission();

    if (granted) {
      try {
        const uri = await barcodeRef.current.capture();
        const fileName = `barcode_${new Date().getTime()}.png`;
        let path;

        if (Platform.OS === 'android') {
          path = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        } else {
          // iOS의 경우 다운로드 폴더 개념이 없으므로 문서 디렉토리를 사용
          path = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        }

        await RNFS.moveFile(uri, path);

        if (Platform.OS === 'android' && Platform.Version >= 33) {
          await RNFS.scanFile(path);
        }

        console.log('image saved at : ', path);
        Alert.alert('성공', '바코드 이미지가 저장되었습니다.');
      } catch (error) {
        console.error(error);
        Alert.alert('오류', '바코드 이미지 저장에 실패했습니다.');
      }
    } else {
      Alert.alert(
        '권한 오류',
        '저장소 접근 권한이 없습니다. 설정에서 권한을 허용해 주세요.',
        [
          {text: '확인', onPress: () => console.log('권한 오류 확인')},
          {text: '설정으로 이동', onPress: () => Linking.openSettings()},
        ],
      );
    }
    onDismiss();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}>
        <ViewShot ref={barcodeRef} options={{format: 'png', quality: 0.9}}>
          <View style={styles.modalContent}>
            <Text style={styles.giftTitle}>스타벅스 아이스 아메리카노 T</Text>

            <View style={styles.barcodeContainer}>
              <Barcode style={styles.barcode} value={barcodeNumber} />
              <Text style={styles.barcodeText}>{barcodeNumber}</Text>
            </View>
          </View>
        </ViewShot>
        <View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveImage}>
            <Text style={styles.saveButtonText}>📸 바코드 저장하기</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.noticeText}>
            * 바코드는 다시 제공되지 않습니다
          </Text>
        </View>
      </Modal>
    </Portal>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: colors[theme].WHITE,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      width: '95%',
    },
    giftTitle: {
      fontSize: 22,
      fontFamily: 'Pretendard-Bold',
      textAlign: 'center',
      color: colors[theme].BLACK,
      marginBottom: 20,
    },
    barcode: {
      width: 150,
      height: 75,
    },
    barcodeContainer: {
      marginVertical: 10,
    },
    barcodeText: {
      fontSize: 24,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
      marginTop: 10,
      textAlign: 'center',
    },
    saveButton: {
      backgroundColor: colors[theme].ORANGE_200,
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop: 25,
      alignItems: 'center',
    },
    saveButtonText: {
      fontSize: 18,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].PRIMARY,
    },
    noticeText: {
      fontSize: 16,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].WHITE,
      marginTop: 10,
    },
  });

export default BarcodeModal;
