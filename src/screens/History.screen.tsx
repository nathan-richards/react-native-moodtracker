import React from 'react';
import { ScrollView } from 'react-native';
import { MoodItemRow } from '../components/MoodItemRow';
import { useAppContext } from '../context/App.provider';

export const History: React.FC = () => {
  const appContext = useAppContext();

  return (
    <ScrollView>
      {appContext.moodList
        .slice()
        .reverse()
        .map(item => (
          <MoodItemRow item={item} key={item.timestamp} />
        ))}
    </ScrollView>
  );
};
