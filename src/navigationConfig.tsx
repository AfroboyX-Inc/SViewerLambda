import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';

import BookShelf from './screens/bookshelf';
import Ranking from './screens/ranking';
import Search from './screens/search';
import Settings from './screens/settings';

const TabBar = createBottomTabNavigator();
const BookshelfStack = createStackNavigator();
const RankingStack = createStackNavigator();
const SearchStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function BookShelfScreen() {
  return (
    <BookshelfStack.Navigator>
      <BookshelfStack.Screen name="本棚" children={() => <BookShelf />} />
    </BookshelfStack.Navigator>
  );
}

function RankingScreen() {
  return (
    <RankingStack.Navigator>
      <RankingStack.Screen name="ランキング" children={() => <Ranking />} />
    </RankingStack.Navigator>
  );
}

function SearchScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="検索" children={() => <Search />} />
    </SearchStack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="設定" children={() => <Settings />} />
    </SettingsStack.Navigator>
  );
}

export default class TabBarNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <TabBar.Navigator>
          <TabBar.Screen
            name="bookshelf"
            component={BookShelfScreen}
            options={{
              tabBarLabel: '本棚',
              tabBarIcon: ({color, size}) => (
                <Icon
                  name="bookshelf"
                  type="material-community"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <TabBar.Screen
            name="ranking"
            component={RankingScreen}
            options={{
              tabBarLabel: 'ランキング',
              tabBarIcon: ({color, size}) => (
                <Icon
                  name="chart-bar"
                  type="material-community"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <TabBar.Screen
            name="search"
            component={SearchScreen}
            options={{
              tabBarLabel: '検索',
              tabBarIcon: ({color, size}) => (
                <Icon
                  name="magnify"
                  type="material-community"
                  color={color}
                  size={size}
                />
              ),
            }}
          />

          <TabBar.Screen
            name="settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: '設定',
              tabBarIcon: ({color, size}) => (
                <Icon
                  name="cog"
                  type="material-community"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </TabBar.Navigator>
      </NavigationContainer>
    );
  }
}
