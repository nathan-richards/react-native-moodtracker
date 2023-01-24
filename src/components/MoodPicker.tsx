import React from 'react';
import { theme } from '../theme/theme';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { PressableArea } from './PressableArea';
import { TMoodOption, TMoodPickerProps } from '../types/TMoodPicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PressableButton } from './PressableButton';
import { AppText } from './AppText';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedPressableButton = Reanimated.createAnimatedComponent(Pressable);

const imageSrc = require('../../assets/emoji-win.png');

const moodOptions: Array<TMoodOption> = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC<TMoodPickerProps> = ({
  handleSelectMood,
}) => {
  const [selectedMood, setSelectedMood] = React.useState<TMoodOption>();
  const [hasSelected, setHasSelected] = React.useState<boolean>(false);

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [handleSelectMood, selectedMood]);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: theme.colorPurple,
      borderRadius: 50,
      transform: [{ scale: selectedMood ? withTiming(1) : withTiming(0.8) }],
    }),
    [selectedMood],
  );

  if (hasSelected) {
    return (
      <View style={styles.moodContainer}>
        <Image source={imageSrc} style={styles.moodImg} />
        <PressableButton
          title="Choose another"
          onPressCB={() => setHasSelected(false)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.moodContainer}>
        <Text style={styles.moodHeading}>How are you right now?</Text>
        <View style={styles.moodOptions}>
          {moodOptions.map(option => (
            <View key={option.emoji}>
              <PressableArea
                onPress={() => setSelectedMood(option)}
                style={[
                  styles.moodItem,
                  selectedMood?.emoji === option.emoji
                    ? styles.selectedMoodItem
                    : undefined,
                ]}>
                <Text style={styles.moodIcon} key={option.emoji}>
                  {option.emoji}
                </Text>
              </PressableArea>
              <Text style={styles.moodText}>
                {selectedMood?.emoji === option.emoji
                  ? option.description
                  : undefined}
              </Text>
            </View>
          ))}
        </View>
        <ReanimatedPressableButton onPress={handleSelect} style={[buttonStyle]}>
          <AppText textFamily="bold" textSize="lg" textColor={theme.colorWhite}>
            Choose
          </AppText>
        </ReanimatedPressableButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  moodContainer: {
    borderRadius: 8,
    borderColor: theme.colorPurple,
    backgroundColor: theme.colorWhite,
    borderWidth: 2,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moodHeading: {
    fontSize: theme.fontSizeLg,
    fontFamily: theme.fontFamilyBold,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  moodIcon: {
    fontSize: theme.fontSizeXl,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  moodText: {
    color: theme.colorPurple,
    fontSize: theme.fontSizeXs,
    fontFamily: theme.fontFamilyReg,
    textAlign: 'center',
  },
  moodImg: {
    alignSelf: 'center',
    marginBottom: 32,
    marginTop: 12,
    borderRadius: 8,
  },
});
