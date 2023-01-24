import React from 'react';
import { theme } from '../theme/theme';
import { View, Text, StyleSheet, LayoutAnimation } from 'react-native';
import { TMoodItemRowProps } from '../types/TMoodPicker';
import format from 'date-fns/format';
import { AppText } from './AppText';
import { PressableArea } from './PressableArea';
import { useAppContext } from '../context/App.provider';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const maxSwipe = 80;

export const MoodItemRow: React.FC<TMoodItemRowProps> = ({ item }) => {
  const appContext = useAppContext();
  const translateX = useSharedValue(0);

  const handleDelete = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [appContext, item]);

  const deleteWithDelay = React.useCallback(() => {
    setTimeout(() => {
      handleDelete();
    }, 500);
  }, [handleDelete]);

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: event => {
        translateX.value = event.translationX;
      },
      onEnd: event => {
        if (Math.abs(event.translationX) > maxSwipe) {
          translateX.value = withTiming(1000 * Math.sign(event.translationX));
          runOnJS(deleteWithDelay)();
        } else {
          translateX.value = withTiming(0);
        }
      },
    },
    [],
  );

  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    [],
  );

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Reanimated.View style={[styles.moodItem, cardStyle]}>
        <View style={styles.iconAndDescription}>
          <Text style={styles.moodValue}>{item.mood.emoji}</Text>
          <Text style={styles.moodDescription}>{item.mood.description}</Text>
        </View>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "d MMM, yyyy 'at' h:mmaaa")}
        </Text>
        <PressableArea onPress={handleDelete}>
          <AppText
            textFamily="bold"
            textSize="sm"
            textColor={theme.colorPurple}>
            Delete
          </AppText>
        </PressableArea>
      </Reanimated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: theme.fontSizeLg,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: theme.fontSizeBase,
    color: theme.colorPurple,
    fontFamily: theme.fontFamilyBold,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
