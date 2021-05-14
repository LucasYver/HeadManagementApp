/* eslint-disable global-require */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { fontSize, heightSize, widthSize } from '../../constants';
import { getLastBallance } from '../../services/utils';
import { Platform } from '../../types/index';
import { numberWithSpaces } from '../../utils/utils';
import Card from '../Card';
import { ThemeText, useThemeColor } from '../Themed';

type PlatformCardType = {
  platform: Platform;
};

const PlatformCard: React.FC<PlatformCardType> = ({ platform }) => {
  const useTheme = useThemeColor();
  const navigation = useNavigation();

  const { wallets, name, media } = platform;

  const balance = getLastBallance(wallets);
  return (
    <Card
      component={TouchableOpacity}
      onPress={() => navigation.navigate('DetailPlatformsScreen', { platformId: platform.id })}
      height={75}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1 }}>
        {media && <Image resizeMode='contain' style={styles.logo} source={{ uri: media.url }} />}
      </View>
      <View style={{ flex: 1 }}>
        <ThemeText style={{ fontSize: fontSize.large, color: useTheme.title }}>{name}</ThemeText>
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <ThemeText style={{ fontSize: fontSize.large, color: useTheme.title }}>
          {numberWithSpaces(balance)} €
        </ThemeText>
      </View>
    </Card>
  );
};

export default PlatformCard;

const styles = StyleSheet.create({
  logo: {
    height: heightSize(40),
    width: widthSize(40),
  },
});
