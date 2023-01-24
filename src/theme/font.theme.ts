import { Dimensions } from 'react-native';

const fontScale = Dimensions.get('window').fontScale;

export const fontFamily = {
  fontFamilyBold: 'Kalam-Bold',
  fontFamilyReg: 'Kalam-Regular',
  fontFamilyLight: 'Kalam-Light',
};

export const fontSize = {
  fontSizeXs: 10 / fontScale,
  fontSizeSm: 12 / fontScale,
  fontSizeBase: 16 / fontScale,
  fontSizeLg: 18 / fontScale,
  fontSizeXl: 24 / fontScale,
};
