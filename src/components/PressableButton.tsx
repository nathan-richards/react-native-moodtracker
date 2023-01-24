import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../theme/theme';
import { PressableArea } from './PressableArea';
import { TButton } from '../types/TButton';

export const PressableButton: React.FC<TButton> = ({ title, onPressCB }) => {
  return (
    <PressableArea
      style={styles.button}
      onPress={onPressCB != null ? onPressCB : undefined}>
      <Text style={styles.buttonText}>{title}</Text>
    </PressableArea>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: theme.colorPurple,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: theme.fontSizeBase,
    fontFamily: theme.fontFamilyBold,
    color: theme.colorWhite,
  },
});
