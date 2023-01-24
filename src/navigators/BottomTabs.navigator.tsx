import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home.screen';
import { History } from '../screens/History.screen';
import { Analytics } from '../screens/Analytics.screen';
import { HomeIcon, HistoryIcon, AnalyticsIcon } from '../components/Icons';
import { theme } from '../theme/theme';
import { Text } from 'react-native';

const BottomTabs = createBottomTabNavigator();

export const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: {
          fontFamily: theme.fontFamilyBold,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarActiveTintColor: theme.colorBlue,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Home':
              return <HomeIcon color={color} size={size} />;
            case 'History':
              return <HistoryIcon color={color} size={size} />;
            case 'Analytics':
              return <AnalyticsIcon color={color} size={size} />;
            default:
              return <Text>{route.name}</Text>;
          }
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: 'Fancy Charts' }}
      />
    </BottomTabs.Navigator>
  );
};
