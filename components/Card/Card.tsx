import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { heightSize, widthSize } from '../../constants';
import { useThemeColor } from '../Themed';

type cardType = ({
  height: number;
  component?: React.ComponentType;
  style?: object;
} & View['props']) &
  TouchableOpacity['props'];

const Card: React.FC<cardType> = ({ height, component, style, ...props }) => {
  const useTheme = useThemeColor();

  const Container = component ?? View;

  return (
    <Container
      style={[
        styles.container,
        { ...style, backgroundColor: useTheme.grey, minHeight: heightSize(height) },
      ]}
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
    width: widthSize(350),
    borderRadius: 20,
    paddingHorizontal: widthSize(10),
    paddingVertical: heightSize(10),
    marginBottom: heightSize(14),
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
