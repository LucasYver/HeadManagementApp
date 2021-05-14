import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import PlatformCard from '../../components/PlatformCard';
import PlatformChart from '../../components/PlatformChart';
import { Container } from '../../components/Themed';
import { heightSize, widthSize } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchPlatforms } from '../../store/reducers/Platform';

export default function HomePlatformsScreen() {
  const dispatch = useAppDispatch();
  const { platforms } = useAppSelector((state) => state.platform);

  useEffect(() => {
    dispatch(fetchPlatforms());
  }, []);

  return (
    <Container>
      {platforms.length > 0 && (
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <PlatformChart platforms={platforms} />
          {platforms.map((platform) => (
            <PlatformCard key={`platform-${platform.id}`} platform={platform} />
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
