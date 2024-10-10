import {BackArrow, ExpandRight} from '@/assets/icons';
import Toggle from '@/components/common/Toggle';
import {colors} from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import {Account, Card} from '@/types/domain';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CardManageScreenProps {}

const cardData = {
  id: 1,
  cardNo: '11111111111',
  cardIssuerName: 'HG은행',
  cardName: '월급카드',
  hideStatus: 'none',
  nickname: '별명',
  // accountBalance: '50000',
};

const CardManageScreen = ({}: CardManageScreenProps) => {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const [asset, setAsset] = useState<Card | null>(cardData);
  return (
    <View style={styles.container}>
      <View style={styles.accountTitleContainer}>
        <Text style={styles.accountNicknameText}>{asset?.nickname}</Text>
        <Text style={styles.accountInfoText}>
          {asset?.cardName} {asset?.cardNo}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.accountNicknameContainer}>
          <Text style={styles.accountNicknameTitle}>카드별명</Text>
          <TouchableOpacity style={styles.nicknameSetupContainer}>
            <Text style={styles.accountNicknameSetup}>{asset?.nickname}</Text>
            <ExpandRight />
          </TouchableOpacity>
        </View>
        <View style={styles.manageContainer}>
          <View style={styles.manageTitleContainer}>
            <Text style={styles.manageTitleMain}>계좌 숨기기</Text>
            <Text style={styles.manageTitleInfo}>자산 목록에서 숨겨져요</Text>
          </View>
          <View style={styles.toggleButton}>
            <Toggle
              isEnabled={asset?.hideStatus === 'none' ? false : true}
              toggleSwitch={() => {
                setAsset(prevAsset => {
                  if (prevAsset) {
                    return {
                      ...prevAsset,
                      hideStatus:
                        prevAsset.hideStatus === 'none' ? 'hide' : 'none',
                    };
                  }
                  return prevAsset;
                });
              }}
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
  });

export default CardManageScreen;
