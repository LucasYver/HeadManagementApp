import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import ChartHistory from '../../components/ChartHistory';
import DetailPlatformCard from '../../components/DetailPlatformCard';
import Header from '../../components/Header';
import ModalInputType from '../../components/ModalInput';
import { Container, useThemeColor } from '../../components/Themed';
import { heightSize, widthSize } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createDeposit, deleteDeposit } from '../../store/reducers/Deposit';
import { fetchPlatformHistory, platformHistorySlice } from '../../store/reducers/PlatformHistory';
import { createWallet, deleteWallet } from '../../store/reducers/Wallet';
import { createWithdraw, deleteWithdraw } from '../../store/reducers/Withdraw';

const segments = {
  0: {
    label: 'Mettre à jour le wallet',
    index: 0,
  },
  1: {
    label: 'Ajouter un dépot',
    index: 0,
  },
  2: {
    label: 'Ajouter un retrait',
    index: 1,
  },
};

export default function DetailPlatformsScreen({ route }: { route: any }) {
  const useTheme = useThemeColor();
  const [segment, setSegment] = useState<0 | 1 | 2>(0);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { platforms } = useAppSelector((state) => state.platform);
  const { histories, unit, intrinsic } = useAppSelector((state) => state.platformHistory);
  const { platformId } = route.params;
  const platform = platforms.find((_platform) => _platform.id === platformId);

  useEffect(() => {
    dispatch(fetchPlatformHistory({ unit, platformId }));
  }, [unit, intrinsic]);

  const onSetModalVisible = useCallback(() => setModalVisible(!modalVisible), [modalVisible]);

  const handleUnitChange = (item: any) => {
    dispatch(platformHistorySlice.actions.setUnit(item.value));
  };

  const handleChangeValue = async (value: number) => {
    onSetModalVisible();
    if (segment === 0) {
      await dispatch(createWallet({ value, platformId }));
    } else if (segment === 1) {
      await dispatch(createDeposit({ value, platformId }));
    } else if (segment === 2) {
      await dispatch(createWithdraw({ value, platformId }));
    }
    dispatch(fetchPlatformHistory({ unit, platformId }));
  };

  const handleWalletDelete = async (id: number) => {
    await dispatch(deleteWallet({ id, platformId }));
    dispatch(fetchPlatformHistory({ unit, platformId }));
  };

  const handleDepositDelete = async (id: number) => {
    await dispatch(deleteDeposit({ id, platformId }));
    dispatch(fetchPlatformHistory({ unit, platformId }));
  };

  const handleWithdrawDelete = async (id: number) => {
    await dispatch(deleteWithdraw({ id, platformId }));
    dispatch(fetchPlatformHistory({ unit, platformId }));
  };

  const handleIntrsincChange = (item: any) => {
    dispatch(platformHistorySlice.actions.setIntrinsic(item.value));
  };

  return (
    <Container>
      <Header
        intrinsic={intrinsic}
        handleIntrsincChange={handleIntrsincChange}
        handleUnitChange={handleUnitChange}
        unit={unit}
      />
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ChartHistory histories={histories} />
        <SegmentedControlTab
          tabsContainerStyle={{}}
          tabStyle={{
            borderColor: useTheme.secondary,
            backgroundColor: useTheme.grey,
            marginBottom: widthSize(15),
          }}
          tabTextStyle={{
            color: '#fff',
          }}
          activeTabStyle={{
            backgroundColor: useTheme.secondary,
          }}
          allowFontScaling={false}
          values={['Wallet', 'Dépôt', 'Retrait']}
          selectedIndex={segment}
          onTabPress={(index) => setSegment(index as 0 | 1 | 2)}
        />
        {platform &&
          segment === 0 &&
          platform.wallets?.map((wallet) => (
            <DetailPlatformCard
              handleDelete={handleWalletDelete}
              prefix=''
              key={`deposit-${wallet.id}`}
              item={wallet}
            />
          ))}
        {platform &&
          segment === 1 &&
          platform.deposits?.map((deposit) => (
            <DetailPlatformCard
              handleDelete={handleDepositDelete}
              color={useTheme.green}
              prefix='+'
              key={`deposit-${deposit.id}`}
              item={deposit}
            />
          ))}
        {platform &&
          segment === 2 &&
          platform.withdraws?.map((withdraw) => (
            <DetailPlatformCard
              handleDelete={handleWithdrawDelete}
              color={useTheme.red}
              prefix='-'
              key={`withdraw-${withdraw.id}`}
              item={withdraw}
            />
          ))}
      </ScrollView>
      <FAB
        label={segments[segment].label as string}
        color='#FFFFFF'
        animated
        style={[styles.fab, { backgroundColor: useTheme.secondary }]}
        icon='plus'
        onPress={onSetModalVisible}
        small
      />
      <ModalInputType
        visible={modalVisible}
        onSetModalVisible={onSetModalVisible}
        handleChangeValue={handleChangeValue}
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
