import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const ratio = width / height;

const baseWidth = 380;
const baseHeight = width > 600 ? 700 : baseWidth / ratio;
const constant = Platform.OS === 'ios' ? 0 : 1;

export const widthSize = (size: number) =>
  PixelRatio.roundToNearestPixel((width / baseWidth) * size) - constant;
export const heightSize = (size: number) =>
  PixelRatio.roundToNearestPixel((height / baseHeight) * size) - constant;

export const fontSize = {
  small: heightSize(12),
  medium: heightSize(13),
  large: heightSize(15),
  xxxlarge: heightSize(30),
};
