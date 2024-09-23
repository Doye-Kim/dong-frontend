import {BackArrow} from '@/assets/icons';
import NotificationHeader from '@/components/common/NotificationHeader';
import {colors} from '@/constants';
import {Gift} from '@/types/domain';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GiftListData from '@/assets/tempData/Asset/GiftListData.json'

interface PointMarketScreenProps {}

type GiftData = Gift[];

const PointMarketScreen = ({}: PointMarketScreenProps) => {
  const [giftList, setGiftList] = useState<GiftData | null>(null);

  useEffect(() => {
    setGiftList(GiftListData.gifticons)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <BackArrow />
        </TouchableOpacity>
        <NotificationHeader />
      </View>
      <View style={styles.pointSectionContainer}>
        <Text style={styles.pointTitleText}>내 포인트</Text>
        <View style={styles.pointContainer}>
          <Text style={styles.pointText}>{(12450).toLocaleString()} p</Text>
        </View>
      </View>
      <ScrollView style={styles.giftListContainer}>
        {giftList?.map((gift, key) => (
          <View style={styles.giftContainer}>
            <View style={styles.giftTitleContainer}>
              <Text style={styles.giftTitle}>{gift.name}</Text>
              <Text style={styles.giftPrice}>{gift.price.toLocaleString()} p</Text>
            </View>
            <View style={styles.buyContainer}>
              <Text>남은 수량 : {gift.stock}개</Text>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>구매</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE, 
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  pointSectionContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  pointTitleText: {
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    color: colors.BLACK,
  },
  pointContainer: {
    backgroundColor: colors.ORANGE_200,
    borderRadius: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 50,
  },
  pointText: {
    fontSize: 40,
    fontFamily: 'Pretendard-Medium',
    color: colors.PRIMARY,
  },
  giftListContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  giftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderColor: colors.GRAY_400,
  },
  giftTitleContainer: {
    flex: 1,
  },
  giftTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
    marginBottom: 15,
  },
  giftPrice: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.BLACK,
  },
  buyContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: colors.WHITE,
  }
});

export default PointMarketScreen;
