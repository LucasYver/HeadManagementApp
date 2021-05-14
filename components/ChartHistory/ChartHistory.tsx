import dayjs from 'dayjs';
import * as React from 'react';
import { LineChart } from 'react-native-chart-kit';

import { heightSize, widthSize } from '../../constants';
import { History } from '../../types/History';
import { useThemeColor } from '../Themed';

type HistoryCardType = {
  histories: History[];
};

const CharHistory: React.FC<HistoryCardType> = ({ histories }) => {
  const useTheme = useThemeColor();

  return (
    <LineChart
      data={{
        labels: histories.map((history) => history.date),
        datasets: [
          {
            data: histories.map((history) => history.balance),
          },
        ],
      }}
      width={widthSize(360)}
      height={heightSize(220)}
      withInnerLines={false}
      withOuterLines={false}
      withVerticalLines={false}
      withHorizontalLines={false}
      withVerticalLabels={false}
      withHorizontalLabels
      yAxisSuffix=' €'
      yAxisInterval={1}
      chartConfig={{
        useShadowColorFromDataset: false,
        backgroundColor: useTheme.primary,
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        backgroundGradientTo: useTheme.primary,
        backgroundGradientFrom: useTheme.primary,
        fillShadowGradient: useTheme.primary,
        decimalPlaces: 0,
        color: () => useTheme.secondary,
        labelColor: () => useTheme.third,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '4',
          strokeWidth: '1',
          stroke: useTheme.third,
        },
      }}
      bezier
      style={{
        marginTop: 8,
        borderRadius: 16,
      }}
      formatXLabel={(data) => dayjs(data).format('DD/MM')}
      segments={3}
    />
  );
};

export default CharHistory;
