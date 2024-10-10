import axiosInstance from '@/api/axios';
import {ExpandRight} from '@/assets/icons';
import Toggle from '@/components/common/Toggle';
import {assetDetailNavigations, colors} from '@/constants';
import {AssetDetailStackParamList} from '@/navigations/stack/asset/AssetDetailStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import {Account} from '@/types/domain';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type AssetManageScreenRouteProp = RouteProp<
  AssetDetailStackParamList,
  typeof assetDetailNavigations.ACCOUNTMANAGE
>;

const AssetManageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<AssetManageScreenRouteProp>();
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [asset, setAsset] = useState<Account | null>(route.params?.account);
  const [nicknameEditStatus, setNicknameEditStatus] = useState<boolean>(false);
  const [nickname, setNickname] = useState(asset?.nickname || '');

  useEffect(() => {
    console.log(asset);
  }, []);

  const toggleMemoEditStatus = () => {
    setNicknameEditStatus(prev => !prev);
  };

  const handleNicknameBlur = () => {
    setAsset(prev => (prev ? {...prev, nickname} : prev));
    toggleMemoEditStatus();
  };

  const toggleHideListStatus = () => {
    if (!asset) return;
    let newStatus = '';
    if (asset.hideState == 'NONE') {
      newStatus = 'HIDE_LIST';
    } else if (asset.hideState === 'HIDE_LIST') {
      newStatus = 'NONE';
    } else if (asset.hideState === 'HIDE_ASSET') {
      newStatus = 'HIDE_ALL';
    } else {
      newStatus = 'HIDE_ASSET';
    }
    setAsset(prev => (prev ? {...prev, hideState: newStatus} : prev));
  };

  const toggleHideAssetStatus = () => {
    if (!asset) return;
    let newStatus = '';
    if (asset.hideState === 'NONE') {
      newStatus = 'HIDE_ASSET';
    } else if (asset.hideState === 'HIDE_ASSET') {
      newStatus = 'NONE';
    } else if (asset.hideState === 'HIDE_LIST') {
      newStatus = 'HIDE_ALL';
    } else {
      newStatus = 'HIDE_LIST';
    }
    setAsset(prev => (prev ? {...prev, hideState: newStatus} : prev));
  };

  useEffect(() => {
    if (asset) {
      navigation.setOptions({
        headerTitle: '',
        headerRight: () => (
          <TouchableOpacity
            onPress={handlePressButton}
            style={styles.manageButton}>
            <Text style={styles.manageText}>완료</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [asset, navigation]);

  const patchAssetState = async () => {
    if (!asset || !asset.id) {
      console.error('Invalid asset or asset ID');
      return;
    }
  
    try {
      const response = await axiosInstance.patch(
        `/assets/accounts/${asset.id}/state?hideState=${asset.hideState}`
      );
      console.log('Asset state updated:', response.data);
    } catch (error) {
      console.error('Error updating asset state:', error);
    }
  };

  const patchAssetNickname = async () => {
    if (!asset || !asset.id) {
      console.error('Invalid asset or asset ID');
      return;
    }
  
    try {
      const response = await axiosInstance.patch(
        `/assets/accounts/${asset.id}/nickname?nickname=${encodeURIComponent(asset.nickname)}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handlePressButton = () => {
    patchAssetState();
    patchAssetNickname();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.accountTitleContainer}>
        <Text style={styles.accountNicknameText}>{asset?.nickname}</Text>
        <Text style={styles.accountInfoText}>
          {asset?.name} {asset?.accountNumber}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.accountNicknameContainer}>
          <Text style={styles.accountNicknameTitle}>계좌별명</Text>
          {nicknameEditStatus ? (
            <TextInput
              value={nickname}
              onChangeText={setNickname}
              style={styles.memoInput}
              onBlur={handleNicknameBlur}
            />
          ) : (
            <>
              <TouchableOpacity
                style={styles.nicknameSetupContainer}
                onPress={toggleMemoEditStatus}>
                <Text style={styles.accountNicknameSetup}>
                  {asset?.nickname}
                </Text>
                <ExpandRight />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.manageContainer}>
          <View style={styles.manageTitleContainer}>
            <Text style={styles.manageTitleMain}>화면에서 금액 숨기기</Text>
            <Text style={styles.manageTitleInfo}>
              숨기면 총 자산과 가계부에서 제외돼요
            </Text>
          </View>
          <View style={styles.toggleButton}>
            <Toggle
              isEnabled={
                asset?.hideState === 'HIDE_ALL' ||
                asset?.hideState === 'HIDE_LIST'
                  ? true
                  : false
              }
              toggleSwitch={toggleHideListStatus}
            />
          </View>
        </View>
        <View style={styles.manageContainer}>
          <View style={styles.manageTitleContainer}>
            <Text style={styles.manageTitleMain}>계좌 숨기기</Text>
            <Text style={styles.manageTitleInfo}>자산 목록에서 숨겨져요</Text>
          </View>
          <View style={styles.toggleButton}>
            <Toggle
              isEnabled={
                asset?.hideState === 'HIDE_ALL' ||
                asset?.hideState === 'HIDE_ASSET'
                  ? true
                  : false
              }
              toggleSwitch={toggleHideAssetStatus}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styling = (theme: 'dark' | 'light') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    accountTitleContainer: {
      marginHorizontal: 25,
    },
    accountNicknameText: {
      fontSize: 30,
      fontFamily: 'Pretendard-ExtraBold',
      color: colors[theme].BLACK,
      marginBottom: 5,
    },
    accountInfoText: {
      fontSize: 15,
      fontFamily: 'Pretendard-Medium',
      color: colors[theme].BLACK,
    },
    contentContainer: {
      marginVertical: 25,
    },
    accountNicknameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 25,
      // alignItems: 'center',
    },
    accountNicknameTitle: {
      fontSize: 18,
      fontFamily: 'Pretendard-Regular',
      color: colors[theme].BLACK,
    },
    nicknameSetupContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    accountNicknameSetup: {
      fontSize: 18,
      fontFamily: 'Pretendard-SemiBold',
      color: colors[theme].BLACK,
      marginRight: 15,
      paddingBottom: 3,
    },
    manageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    manageTitleContainer: {
      marginHorizontal: 25,
      marginVertical: 20,
    },
    manageTitleMain: {
      fontSize: 18,
      fontFamily: 'Pretendard-Bold',
      color: colors[theme].BLACK,
    },
    manageTitleInfo: {
      fontSize: 13,
      fontFamily: 'Pretendard-Regular',
      color: colors[theme].BLACK,
    },
    toggleButton: {
      marginRight: 25,
    },
    memoInput: {
      fontSize: 15,
      fontFamily: 'Pretendard-Regular',
      color: colors[theme].BLACK,
      width: 200,
      borderBottomWidth: 1,
      paddingVertical: 0,
      marginVertical: 0,
    },
    manageButton: {
      marginRight: 15,
    },
    manageText: {
      fontSize: 16,
      fontFamily: 'Pretendard-Regular',
      color: colors[theme].BLACK,
    },
  });

export default AssetManageScreen;
