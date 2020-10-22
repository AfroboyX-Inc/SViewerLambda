import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';

import {ChapterSchema, NovelSchema, SectionSchema} from '../database/schemas';
import {formatDate} from '../functions/myUtils';

function cellView(novel: object) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
      }}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{novel.title}</Text>
        <Text style={styles.link}>
          https://ncode.syosetu.com/{novel.ncode}/
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.chapterCount}>全{novel.chapterCount}話</Text>
        <Text style={styles.lastUpdate}>
          {formatDate(novel.downloadDate, 'yyyy年MM月dd日')}
        </Text>
      </View>
    </View>
  );
}

export default function Bookshelf() {
  const [novelData, SetNovelData] = useState({});
  const [selectedItem, SetSelectedItem] = useState({});
  const navigation = useNavigation();
  /*
  const realm = new Realm({
    schema: [NovelSchema, SectionSchema, ChapterSchema],
  });

  realm.addListener('change', () => {
    SetNovelData(realm.objects('Novel'));
  });
  */

  useEffect(() => {
    Realm.open({schema: [NovelSchema, SectionSchema, ChapterSchema]}).then(
      (realm) => {
        SetNovelData(realm.objects('Novel').sorted('downloadDate', true));

        realm.addListener('change', () => {
          SetNovelData(realm.objects('Novel').sorted('downloadDate', true));
        });
      },
    );

    const realm = new Realm({
      schema: [NovelSchema, SectionSchema, ChapterSchema],
    });

    realm.addListener('change', () => {
      SetNovelData(realm.objects('Novel'));
    });
  }, []);

  return (
    <FlatList
      data={novelData}
      renderItem={({item, index}) => (
        <Pressable
          style={({pressed}) => [
            {backgroundColor: pressed ? 'lightgrey' : 'white'},
            styles.cellContainer,
          ]}
          onPress={() => {
            navigation.navigate('chapterList', {
              data: novelData[index],
            });
          }}
          onLongPress={() => {}}
          children={() => cellView(item)}
        />
      )}
      keyExtractor={(item) => item.ncode}
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
  leftContainer: {paddingLeft: 0},
  title: {fontSize: 15, color: '#FE7643', fontWeight: 'bold'},
  link: {fontSize: 10, color: 'grey'},
  rightContainer: {alignItems: 'flex-end', paddingLeft: 0},
  chapterCount: {fontSize: 10},
  lastUpdate: {fontSize: 10},
});
