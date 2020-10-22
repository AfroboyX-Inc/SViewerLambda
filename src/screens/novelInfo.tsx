import React from 'react';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';

import {formatDate, formatNumber, isEmpty} from '../functions/myUtils';
import {downloadNovel, website} from '../functions/novelDownloader';
import {Novel} from '../functions/narou';

export default function NovelInfo(novel: Novel) {
  if (!isEmpty(novel)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{novel.title}</Text>

        <Text>
          <Text>作者 : {novel.author}</Text>
          <Text>{'    '}</Text>
          <Text>ジャンル : {novel.genre}</Text>
        </Text>

        <Text>
          <Text style={styles.points}>{formatNumber(novel.totalPoints)}pt</Text>
          <Text>{'    '}</Text>
          <Text>
            {novel.endStatus}(全{novel.chapterCount}部分)
          </Text>
          <Text>{'    '}</Text>
          <Text>{formatNumber(novel.wordCount)}文字</Text>
        </Text>

        <Text>あらすじ : {'\n'}</Text>
        <View style={styles.summaryContainer}>
          <Text>{novel.summary}</Text>
        </View>

        <Text>キーワード : </Text>

        <Text style={styles.keywords}>{novel.keywords}</Text>

        <Text style={styles.lastUpdate}>
          最終更新日 : {formatDate(novel.lastUpdate, 'yyyy年MM月dd日 HH時mm分')}
        </Text>
      </View>
    );
  }
}

export function downloadButton(novel: Novel, website: website) {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'lightgrey' : '#E6FAFA',
        },
        styles.downloadButton,
      ]}
      onPress={async () => {
        Alert.alert(`${novel.title}`, 'ダウンロードしますか？', [
          {
            text: 'はい',
            onPress: async () => await downloadNovel(novel.ncode, website),
          },
          {
            text: 'キャンセル',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      }}>
      <Text style={styles.downloadButtonText}>ダウンロード</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'transparent',
    padding: 10,
    flex: 1,
  },
  scrollView: {
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FE7643',
  },
  points: {
    color: '#DD0000',
  },
  summaryContainer: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#99CCCC',
    padding: 5,
  },
  keywords: {
    color: '#00AA77',
  },
  lastUpdate: {
    color: '#666666',
  },
  downloadButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: '95%',
    height: 45,
    borderRadius: 5,
  },
  downloadButtonText: {
    fontSize: 24,
  },
});
