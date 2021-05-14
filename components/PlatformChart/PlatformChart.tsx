import * as React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import { fontSize, heightSize, widthSize } from '../../constants';
import { getLastBallance } from '../../services/utils';
import { Platform } from '../../types/';
import { useThemeColor } from '../Themed';

type PlatformChartType = {
  platforms: Platform[];
};

const PlatformChart: React.FC<PlatformChartType> = ({ platforms }) => {
  const useTheme = useThemeColor();

  return (
    <View style={{ marginBottom: heightSize(14) }}>
      <PieChart
        style={{ borderRadius: 20 }}
        data={platforms.map((platform) => {
          const balance = getLastBallance(platform.wallets);
          return {
            name: platform.name,
            balance,
            color: platform.colorCode,
            legendFontColor: '#ffffff',
            legendFontSize: fontSize.medium,
          };
        })}
        width={widthSize(350)}
        height={heightSize(200)}
        chartConfig={{
          color: () => useTheme.secondary,
        }}
        accessor='balance'
        backgroundColor={useTheme.grey}
        paddingLeft='15'
      />
    </View>
  );
};

export default PlatformChart;
