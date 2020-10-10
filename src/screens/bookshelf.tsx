import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

function cellView(novel: Novel, index: number) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{novel.title}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeft}>
          <Text>https://ncode.syosetu.com/{novel.ncode}/</Text>
        </View>
        <View style={styles.bottomRight}>
          <Text>
            {novel.chapterCount}話 {novel.lastUpdate}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function Bookshelf() {
  const novelData = [] as Novel[];

  let testData: Novel = {
    ncode: 'n114514',
    title: 'テストちう',
    author: 'アフロの小僧',
    genre: 'SF...な気がする',
    totalPoints: 9999,
    endStatus: '連載中',
    chapterCount: 9999,
    wordCount: 9999,
    summary: 'これはテストであり、実際のデータではない',
    keywords: 'テスト　エッチ　なんてこった',
    lastUpdate: '1995-11-03 22:25:16',
    novelType: 1,
  };

  novelData.push(testData);

  return (
    <FlatList
      data={novelData}
      renderItem={({item, index}) => (
        <TouchableOpacity style={styles.cellContainer}>
          {cellView(item, index)}
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.ncode}
      contentContainerStyle={{padding: 10}}
      style={{flex: 1}}
    />
  );
}

const styles = StyleSheet.create({
  cellContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
  titleContainer: {height: 30, flex: 1},
  titleText: {color: '#FE7642', fontSize: 20, fontWeight: '500'},
  bottomContainer: {flexDirection: 'row'},
  bottomLeft: {},
  urlText: {},
  bottomRight: {},
  countText: {},
  dateText: {},
});
