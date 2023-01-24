export type TMoodOption = {
  emoji: string;
  description: string;
};

export type TMoodOptionWithTimeStamp = {
  mood: TMoodOption;
  timestamp: number;
};

export type TMoodPickerProps = {
  handleSelectMood: (selectedMood: TMoodOption) => void;
};

export type TMoodItemRowProps = {
  item: TMoodOptionWithTimeStamp;
};
