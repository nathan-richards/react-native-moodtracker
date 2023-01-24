import React from 'react';
import { Text, TextProps } from 'react-native';
import { theme } from '../theme/theme';

type TAppText = TextProps & {
  textFamily: 'bold' | 'reg' | 'light';
  textSize?: 'xs' | 'sm' | 'reg' | 'lg' | 'xl';
  textColor?: string;
};

export const AppText: React.FC<TAppText> = ({
  children,
  style,
  textFamily = 'reg',
  textColor = theme.colorBlue,
  textSize = 'reg',
  ...props
}) => {
  const fontStyle = React.useMemo(() => {
    const size = () => {
      switch (textSize) {
        case 'xs':
          return theme.fontSizeXs;
        case 'sm':
          return theme.fontSizeSm;
        case 'reg':
          return theme.fontSizeBase;
        case 'lg':
          return theme.fontSizeLg;
        case 'xl':
          return theme.fontSizeXl;
        default:
          return theme.fontSizeBase;
      }
    };

    const family = () => {
      switch (textFamily) {
        case 'bold':
          return theme.fontFamilyBold;
        case 'reg':
          return theme.fontFamilyReg;
        case 'light':
          return theme.fontFamilyLight;
        default:
          return theme.fontFamilyReg;
      }
    };
    return {
      fontFamily: family(),
      fontSize: size(),
      color: textColor,
    };
  }, [textFamily, textSize, textColor]);

  return (
    <Text {...props} style={[style, fontStyle]}>
      {children}
    </Text>
  );
};
