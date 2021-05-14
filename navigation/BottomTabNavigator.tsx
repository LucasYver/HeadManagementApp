import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import { useThemeColor } from '../components/Themed';
import DetailPlatformsScreen from '../screens/PlatformsScreen/DetailPlatformsScreen';
import HomePlatformsScreen from '../screens/PlatformsScreen/HomePlatformsScreen';
import ReportingScreen from '../screens/ReportingScreen';
import { BottomTabParamList, PlatformsParamList, ReportingParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const useTheme = useThemeColor();

  return (
    <BottomTab.Navigator
      initialRouteName='Reporting'
      tabBarOptions={{
        activeTintColor: useTheme.secondary,
        inactiveTintColor: useTheme.text,
        tabStyle: {
          backgroundColor: useTheme.primary,
        },
        style: { backgroundColor: useTheme.primary },
      }}
    >
      <BottomTab.Screen
        name='Reporting'
        component={ReportingNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='account-balance' color={color} />,
        }}
      />
      <BottomTab.Screen
        name='Platforms'
        component={PlatformsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name='account-balance-wallet' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ReportingStack = createStackNavigator<ReportingParamList>();

function ReportingNavigator() {
  const useTheme = useThemeColor();

  return (
    <ReportingStack.Navigator>
      <ReportingStack.Screen
        name='ReportingScreen'
        component={ReportingScreen}
        options={{
          // headerTitle: 'Tab One Title',
          headerStyle: { backgroundColor: useTheme.primary },
          headerTitleStyle: {
            color: useTheme.third,
          },
        }}
      />
    </ReportingStack.Navigator>
  );
}

const PlatformsScreen = createStackNavigator<PlatformsParamList>();

function PlatformsNavigator() {
  const useTheme = useThemeColor();

  return (
    <PlatformsScreen.Navigator>
      <PlatformsScreen.Screen
        name='HomePlatformsScreen'
        component={HomePlatformsScreen}
        options={{
          // headerTitle: 'Tab Two Title',
          headerStyle: { backgroundColor: useTheme.primary },
          headerTitleStyle: {
            color: useTheme.third,
          },
        }}
      />
      <PlatformsScreen.Screen
        name='DetailPlatformsScreen'
        component={DetailPlatformsScreen}
        options={{
          // headerTitle: 'Tab Two Title',
          headerStyle: { backgroundColor: useTheme.primary },
          headerTitleStyle: {
            color: useTheme.third,
          },
        }}
      />
    </PlatformsScreen.Navigator>
  );
}
