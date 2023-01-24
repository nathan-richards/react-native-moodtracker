import React from 'react';
import { Pressable, PressableProps } from 'react-native';

export const PressableArea: React.FC<PressableProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <Pressable
      {...rest}
      style={args => {
        const appliedStyle = typeof style === 'function' ? style(args) : style;
        if (args.pressed) {
          return [appliedStyle, { opacity: 0.9 }];
        }
        return appliedStyle;
      }}>
      {children}
    </Pressable>
  );
};
