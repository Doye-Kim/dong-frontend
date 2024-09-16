import {colors} from '@/constants';
import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const images: Record<number, any> = {
  0: require('@/assets/noti-0.png'),
  1: require('@/assets/noti-1.png'),
  2: require('@/assets/noti-2.png'),
  3: require('@/assets/noti-3.png'),
};

interface NotiProps {
  read: boolean;
  category: string;
  name?: string;
  point?: number;
  icon: number;
  dateTime: string;
}

const NotiItem: React.FC<NotiProps> = ({
  read,
  category,
  name,
  point,
  icon,
  dateTime,
}) => {
  const imageSource = images[icon];

  const contentTextStyle = {
    ...styles.contentText,
    color: read ? colors.GRAY_500 : colors.BLACK,
  };

  return (
    <View
      style={[
        styles.container,
        read
          ? {backgroundColor: colors.GRAY_200}
          : {backgroundColor: colors.WHITE},
      ]}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{category}</Text>
          <Text style={styles.headerText}>{dateTime}</Text>
        </View>
        {category === '정산 요청' ? (
          <Text style={contentTextStyle}>{name}님이 정산을 요청했습니다.</Text>
        ) : category === '내기 신청' ? (
          <Text style={contentTextStyle}>{name}님이 내기를 신청했습니다.</Text>
        ) : category === '고정 지출 알림' ? (
          <Text style={contentTextStyle}>
            내일 {name}에 지출이 있을 예정이에요!
          </Text>
        ) : category === '고정 지출 등록' ? (
          <Text style={contentTextStyle}>3개월 연속 {name}을 결제했어요</Text>
        ) : (
          <Text style={contentTextStyle}>{point} 포인트 적립 완료!</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'pink',
    padding: 5,
  },
  image: {
    width: 30,
    height: 30,
    margin: 10,
  },
  contentContainer: {
    width: Dimensions.get('screen').width - 70,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: colors.GRAY_500,
  },
  contentText: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
  },
});

export default NotiItem;
