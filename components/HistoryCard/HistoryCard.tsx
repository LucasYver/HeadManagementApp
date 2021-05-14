import dayjs from 'dayjs';
import React from 'react';
import { View } from 'react-native';

import { fontSize } from '../../constants';
import { History } from '../../types/History';
import { numberWithSpaces } from '../../utils/utils';
import Card from '../Card';
import { ThemeText, useThemeColor } from '../Themed';

type HistoryCardType = {
  history: History;
};

const HistoryCard: React.FC<HistoryCardType> = ({ history }) => {
  const useTheme = useThemeColor();
  return (
    <Card height={75}>
      <View style={{ flex: 1 }}>
        <ThemeText style={{ fontSize: fontSize.large, color: useTheme.title }}>
          {dayjs(history.date).format('D MMMM')}
        </ThemeText>
        <ThemeText style={{ fontSize: fontSize.small, color: useTheme.text }}>
          {dayjs(history.date).format('YYYY')}
        </ThemeText>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <ThemeText style={{ fontSize: fontSize.large, color: useTheme.title }}>
          {numberWithSpaces(history.balance)} €
        </ThemeText>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <ThemeText
          style={{
            fontSize: fontSize.large,
            color: history.percent >= 0 ? useTheme.green : useTheme.red,
          }}
        >
          {history.percent ? numberWithSpaces(history.percent) : '0.00'} %
        </ThemeText>
      </View>
    </Card>
  );
};

export default HistoryCard;
