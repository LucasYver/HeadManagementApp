/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ChartHistory from '../components/ChartHistory';
import HistoryCard from '../components/HistoryCard';
import { Container } from '../components/Themed';
import { heightSize, widthSize } from '../constants';

export default function TabOneScreen() {
  return (
    <Container>
      <ChartHistory />
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {histories.map((history, index) => (
          <HistoryCard
            key={`history-profitability-${index}`} // TODO : change by id
            history={history}
          />
        ))}
      </ScrollView>
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

const histories = [
  {
    date: '2021/01/02',
    percent: 8.71,
    addedPercent: 0.75,
    value: 1756.34,
  },
  {
    date: '2021/01/02',
    percent: 8.71,
    addedPercent: 0.75,
    value: 1756.34,
  },
  {
    date: '2021/01/02',
    percent: 8.71,
    addedPercent: 0.75,
    value: 1756.34,
  },
  {
    date: '2021/01/02',
    percent: 8.71,
    addedPercent: 0.75,
    value: 1756.3499,
  },
  {
    date: '2021/01/02',
    percent: 8.71,
    addedPercent: 0.75,
    value: 1756.34,
  },
  {
    date: '2021/01/02',
    percent: 8.71,
    addedPercent: 0.75,
    value: 1756.3499,
  },
];
