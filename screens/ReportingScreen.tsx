import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ChartHistory from '../components/ChartHistory';
import Header from '../components/Header';
import HistoryCard from '../components/HistoryCard';
import { Container } from '../components/Themed';
import { heightSize, widthSize } from '../constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchHistories, historySlice } from '../store/reducers/History';

export default function ReportingScreen() {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { unit, intrinsic } = useAppSelector((state) => state.history);
  const { histories } = useAppSelector((state) => state.history);

  useEffect(() => {
    if (isFocused === true) {
      dispatch(fetchHistories());
    }
  }, [unit, intrinsic, isFocused]);

  const handleUnitChange = (item: any) => {
    dispatch(historySlice.actions.setUnit(item.value));
  };

  const handleIntrsincChange = (item: any) => {
    dispatch(historySlice.actions.setIntrinsic(item.value));
  };

  const reverseHistory = [...histories].reverse();
  return (
    <Container>
      <Header
        intrinsic={intrinsic}
        handleIntrsincChange={handleIntrsincChange}
        handleUnitChange={handleUnitChange}
        unit={unit}
      />
      {histories.length > 0 && (
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ChartHistory histories={histories} />

          {reverseHistory.map((history) => (
            <HistoryCard key={`history-profitability-${history.date}`} history={history} />
          ))}
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  listHeader: {
    alignSelf: 'flex-start',
    marginBottom: heightSize(10),
    marginTop: heightSize(20),
  },
  separator: {
    marginBottom: heightSize(5),
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: widthSize(8),
  },
});
