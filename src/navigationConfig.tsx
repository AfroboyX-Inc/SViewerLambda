import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BookShelf from './screens/bookshelf';
import Ranking from './screens/ranking';
import Search from './screens/search';
import Settings from './screens/settings';
import ChapterList from './screens/chapterList';
import Reader from './screens/reader';
import {BookshelfParamList} from './navigationTypes';

const TabBar = createBottomTabNavigator();
const BookshelfStack = createStackNavigator<BookshelfParamList>();
const RankingStack = createStackNavigator();
const SearchStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function BookShelfScreen() {
  return (
    <BookshelfStack.Navigator>
      <BookshelfStack.Screen
        name="bookshelf"
        component={BookShelf}
        options={{title: '本棚'}}
      />
      <BookshelfStack.Screen
        name="chapterList"
        component={ChapterList}
        options={{title: '一覧'}}
      />
      <BookshelfStack.Screen
        name="reader"
        component={Reader}
        options={{title: 'リーダー'}}
      />
    </BookshelfStack.Navigator>
  );
}

function RankingScreen() {
  return (
    <RankingStack.Navigator>
      <RankingStack.Screen
        name="ranking"
        component={Ranking}
        options={{title: 'ランキング'}}
      />
    </RankingStack.Navigator>
  );
}

function SearchScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="search"
        component={Search}
        options={{title: '検索'}}
      />
    </SearchStack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="settings"
        component={Settings}
        options={{title: '設定'}}
      />
    </SettingsStack.Navigator>
  );
}

export default class TabBarNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <TabBar.Navigator>
          <TabBar.Screen
            name="bookshelfTab"
            component={BookShelfScreen}
            options={{
              tabBarLabel: '本棚',
              tabBarIcon: ({color, size}) => (
                <Icon name="bookshelf" color={color} size={size} />
              ),
            }}
          />
          <TabBar.Screen
            name="rankingTab"
            component={RankingScreen}
            options={{
              tabBarLabel: 'ランキング',
              tabBarIcon: ({color, size}) => (
                <Icon name="chart-bar" color={color} size={size} />
              ),
            }}
          />
          <TabBar.Screen
            name="searchTab"
            component={SearchScreen}
            options={{
              tabBarLabel: '検索',
              tabBarIcon: ({color, size}) => (
                <Icon name="magnify" color={color} size={size} />
              ),
            }}
          />

          <TabBar.Screen
            name="settingsTab"
            component={SettingsScreen}
            options={{
              tabBarLabel: '設定',
              tabBarIcon: ({color, size}) => (
                <Icon name="cog" color={color} size={size} />
              ),
            }}
          />
        </TabBar.Navigator>
      </NavigationContainer>
    );
  }
}
