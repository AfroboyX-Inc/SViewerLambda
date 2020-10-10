import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {formatNumber} from '../functions/myUtils';
import {fromNarou} from '../functions/novelDownloader';

export default function NovelInfo(novel: Novel) {
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

      <Text style={styles.lastUpdate}>最終更新日 : {novel.lastUpdate}</Text>
    </View>
  );
}

export function downloadButton(ncode: string, count: number, type: number) {
  return (
    <Pressable
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'lightgrey' : '#E6FAFA',
        },
        styles.downloadButton,
      ]}
      onPress={async () => alert(await fromNarou(ncode, count, type))}>
      <Text style={styles.downloadButtonText}>ダウンロード</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'white',
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
