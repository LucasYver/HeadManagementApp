import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { widthSize } from '../constants';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor() {
  const theme = useColorScheme();

  return Colors[theme];
}

export function Container(props: View['props']) {
  const useTheme = useThemeColor();
  return (
    <View
      style={[styles.container, { backgroundColor: useTheme.primary }, props.style]}
      {...props}
    />
  );
}

export function ThemeText(props: Text['props']) {
  const useTheme = useThemeColor();
  return <Text {...props} style={[{ color: useTheme.text }, props.style]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: widthSize(4),
  },
});
