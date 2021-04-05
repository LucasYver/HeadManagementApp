import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { heightSize, widthSize } from '../../constants';
import { useThemeColor } from '../Themed';

type cardType = {
  height: number;
} & View['props'];

const Card = (props: cardType) => {
  const useTheme = useThemeColor();
  const { height } = props;
  return (
    <View
      style={[styles.container, { backgroundColor: useTheme.card, minHeight: heightSize(height) }]}
      {...props}
    />
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: widthSize(360),
    borderRadius: 10,
    paddingHorizontal: widthSize(10),
    paddingVertical: heightSize(10),
    marginBottom: heightSize(5),
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
