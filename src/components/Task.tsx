import React, { FC } from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { date } from '@app/utils';

interface Props {
  name: string;
  isActive: boolean;
  id: string;
  spendTimeInSeconds: number;
  onPlayStopIconPress: (id: string) => void;
}

const Task: FC<Props> = ({
  name,
  isActive,
  id,
  onPlayStopIconPress,
  spendTimeInSeconds,
}) => {
  const iconName = isActive ? 'stop' : 'play';
  const handleOnPlayStopIconPress = () => onPlayStopIconPress(id);

  return (
    <ListItem
      bottomDivider
      onPress={() => null}
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}>
      <ListItem.Content>
        <ListItem.Title style={{ color: 'red' }}>{name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Content
        right
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ListItem.Title right>
          {date.formatSecondsToTimeString(spendTimeInSeconds)}
        </ListItem.Title>
        <Icon
          raised
          name={iconName}
          type="font-awesome"
          color="#f50"
          onPress={handleOnPlayStopIconPress}
          tvParallaxProperties={undefined}
        />
      </ListItem.Content>
    </ListItem>
  );
};

export default Task;
