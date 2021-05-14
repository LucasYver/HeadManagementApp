import React, { useState } from 'react';
import { Platform, StyleSheet, Switch, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { fontSize, heightSize, widthSize } from '../../constants';
import { ThemeText, useThemeColor } from '../Themed';

type HeaderType = {
  unit: string;
  intrinsic: boolean;
  handleUnitChange: (item: any) => void;
  handleIntrsincChange: (value: boolean) => void;
};
const Header: React.FC<HeaderType> = ({
  unit,
  intrinsic,
  handleUnitChange,
  handleIntrsincChange,
}) => {
  const useTheme = useThemeColor();

  return (
    <View style={styles.container}>
      <ThemeText style={[styles.title, { fontSize: fontSize.xxxlarge, color: useTheme.third }]}>
        Reporting
      </ThemeText>
      <Switch
        trackColor={{ false: useTheme.grey, true: useTheme.secondary }}
        thumbColor={intrinsic ? '#fff' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={handleIntrsincChange}
        value={intrinsic}
      />
      <DropDownPicker
        items={[
          {
            label: 'Daily',
            value: 'days',
          },
          { label: 'Weekly', value: 'week' },
          {
            label: 'Monthly',
            value: 'month',
          },
        ]}
        defaultValue={unit}
        containerStyle={{
          height: heightSize(45),
          width: widthSize(100),
        }}
        zIndex={10000}
        style={{ backgroundColor: useTheme.secondary, borderColor: useTheme.secondary }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        labelStyle={{
          fontWeight: '500',
          fontSize: fontSize.medium,
          color: useTheme.third,
        }}
        dropDownStyle={{ backgroundColor: useTheme.secondary }}
        onChangeItem={handleUnitChange}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: widthSize(360),
    paddingHorizontal: widthSize(10),
    marginVertical: heightSize(10),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        zIndex: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  title: {
    fontWeight: 'bold',
  },
});
