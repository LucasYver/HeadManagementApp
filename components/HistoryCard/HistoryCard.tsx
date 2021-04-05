import dayjs from 'dayjs';
import React from 'react';
import { Text, View } from 'react-native';

import { fontSize } from '../../constants';
import Card from '../Card';
import { useThemeColor } from '../Themed';

type HistoryCardType = {
  history: any;
};

const HistoryCard: React.FC<HistoryCardType> = ({ history }) => {
  const useTheme = useThemeColor();
  return (
    <Card height={75}>
      <View>
        <Text style={{ fontSize: fontSize.large }}>{dayjs(history.date).format('MMMM')}</Text>
        <Text style={{ fontSize: fontSize.small, color: useTheme.grey }}>
          {dayjs(history.date).format('YYYY')}
        </Text>
      </View>
      <Text style={{ fontSize: fontSize.large }}>{history.value?.toFixed(2)} €</Text>
      <View>
        <Text style={{ fontSize: fontSize.large, color: useTheme.green }}>
          {history.percent?.toFixed(2)}%
        </Text>
        <Text style={{ fontSize: fontSize.small, color: useTheme.grey }}>
          {history.addedPercent?.toFixed(2)}%
        </Text>
      </View>
    </Card>
  );
};

export default HistoryCard;
