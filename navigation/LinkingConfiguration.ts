import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Reporting: {
            screens: {
              ReportingScreen: 'reporting',
            },
          },
          Platforms: {
            screens: {
              PlatformsScreen: 'platforms',
              DetailPlatformsScreen: 'detailPlatforms',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
