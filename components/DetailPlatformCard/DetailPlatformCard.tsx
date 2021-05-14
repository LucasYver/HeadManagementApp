import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Swipeout from 'react-native-swipeout';

import { fontSize, heightSize, widthSize } from '../../constants';
import { Deposit, Wallet, Withdraw } from '../../types/';
import { numberWithSpaces } from '../../utils/utils';
import Card from '../Card';
import { ThemeText, useThemeColor } from '../Themed';

type DetailPlatformCardType = {
  item: Deposit | Withdraw | Wallet;
  color?: string;
  prefix: string;
  handleDelete: (id: number) => void;
};

const SwipeoutView: React.FC = () => {
  const useTheme = useThemeColor();
  return (
    <View style={[styles.container, { backgroundColor: useTheme.red }]}>
      <MaterialIcons name='delete-outline' size={widthSize(25)} color='#fff' />
    </View>
  );
};

const DetailPlatformCard: React.FC<DetailPlatformCardType> = ({
  item,
  color,
  prefix,
  handleDelete,
}) => {
  const swipeoutBtns = [
    {
      text: 'Button',
      backgroundColor: 'transparent',
      component: <SwipeoutView />,
      onPress: () => handleDelete(item.id),
    },
  ];

  const useTheme = useThemeColor();
  return (
    <Swipeout backgroundColor='transparent' right={swipeoutBtns}>
      <Card height={55}>
        <View style={{ flex: 1 }}>
          <ThemeText style={{ fontSize: fontSize.large, color: useTheme.title }}>
            {dayjs(item.date).format('D MMMM YYYY')}
          </ThemeText>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <ThemeText style={{ fontSize: fontSize.large, color: color || '#fff' }}>
            {prefix}
            {numberWithSpaces(item.value)} €
          </ThemeText>
        </View>
      </Card>
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: widthSize(55),
    height: heightSize(55),
    borderRadius: 20,
    left: widthSize(5),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default DetailPlatformCard;
