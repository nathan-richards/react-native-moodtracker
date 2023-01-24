import React from 'react';
import { createContext } from 'react';
import { TMoodOption, TMoodOptionWithTimeStamp } from '../types/TMoodPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: Array<TMoodOptionWithTimeStamp>;
};

const dataKey = 'my-app-data';

const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch {}
  return null;
};

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch {}
};

type AppContextType = {
  moodList: Array<TMoodOptionWithTimeStamp>;
  handleSelectMood: (mood: TMoodOption) => void;
  handleDeleteMood: (moodToDelete: TMoodOptionWithTimeStamp) => void;
};

const defaultValue: AppContextType = {
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
};

const AppContext = createContext<AppContextType>(defaultValue);

export const AppProvider: React.FC = ({ children }) => {
  const [moodList, setMoodList] = React.useState<
    Array<TMoodOptionWithTimeStamp>
  >([]);

  const handleSelectMood = React.useCallback((selectedMood: TMoodOption) => {
    setMoodList(current => {
      const newMoodList = [
        ...current,
        { mood: selectedMood, timestamp: Date.now() },
      ];

      setAppData({ moodList: newMoodList });

      return newMoodList;
    });
  }, []);

  const handleDeleteMood = React.useCallback(
    (moodToDelete: TMoodOptionWithTimeStamp) => {
      setMoodList(current => {
        const newMoodList = current.filter(
          mood => mood.timestamp !== moodToDelete.timestamp,
        );

        setAppData({
          moodList: newMoodList,
        });

        return newMoodList;
      });
    },
    [],
  );

  React.useEffect(() => {
    const fetchAppData = async () => {
      getAppData().then(res => {
        if (res?.moodList) {
          setMoodList(res.moodList);
        }
      });
    };

    fetchAppData();
  }, []);

  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
