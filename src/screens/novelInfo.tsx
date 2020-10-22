import React from 'react';
import {View, Text, StyleSheet, Pressable, Alert, StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { STYLES } from '../utils/variables'

import {formatDate, formatNumber, isEmpty} from '../functions/myUtils';
import {downloadNovel, website} from '../functions/novelDownloader';
import {Novel} from '../functions/narou';

export default function NovelInfo(novel: Novel) {
  if (!isEmpty(novel)) {
    const keywordsArr = novel.keywords.split(/\s/)
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{novel.title}</Text>
          <Text style={styles.author}>作者：{novel.author}</Text>
        </View>
        <View style={styles.informations}>
          <Text style={styles.informationTexts}>ジャンル：{novel.genre}</Text>
          <Text style={styles.informationTexts}>{formatNumber(novel.totalPoints)}pt</Text>
          <Text style={styles.informationTexts}>
            {novel.endStatus}(全{novel.chapterCount}部分)
          </Text>
          <Text style={styles.informationTexts}>{formatNumber(novel.wordCount)}文字</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionHeading}>あらすじ</Text>
          <Text style={styles.summaryText}>{novel.summary}</Text>
        </View>
        <View>
          <Text style={styles.sectionHeading}>キーワード</Text>
          <View style={styles.keywordsContainer}>
            { 
              keywordsArr.map( (item, index) => { return ( <Text style={styles.keyword} key={index}>{item}{keywordsArr.length === index + 1 ? '' : ' / '}</Text> ) } ) 
            }
          </View>
        </View>
        <Text style={styles.lastUpdate}>
          最終更新日：{formatDate(novel.lastUpdate, 'yyyy年MM月dd日 HH時mm分')}
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
          backgroundColor: pressed ? 'lightgrey' : STYLES.colors.secondary,
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
      <Text style={styles.downloadButtonText}>ダウンロード <Icon name="download" color={"white"} size={STYLES.fontSize.md}/></Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  scrollView: {
    paddingTop: 30,
  },
  heading: {
    marginBottom: STYLES.gutters.sm
  },
  title: {
    fontSize: STYLES.fontSize.lg,
    lineHeight: STYLES.fontSize.lg * 1.3,
    letterSpacing: STYLES.fontSize.lg * 0.03,
    marginBottom: STYLES.gutters.xs,
    fontWeight: 'bold',
    color: STYLES.colors.primary,
  },
  author: {
    // fontWeight: 'bold',
    fontSize: STYLES.fontSize.md,
    color: STYLES.colors.text,
    letterSpacing: STYLES.fontSize.md * 0.02 ,  

  },
  informations: {
    marginBottom: STYLES.gutters.md
  },
  informationTexts: {
    fontSize: STYLES.fontSize.xsm,
    color: STYLES.colors.lightText,
    lineHeight: STYLES.fontSize.xsm * 1.4,
    letterSpacing: STYLES.fontSize.xsm * 0.02 ,  
  },
  points: {
    color: '#DD0000',
  },
  sectionHeading: {
    fontWeight: 'bold',
    fontSize: STYLES.fontSize.md,
    marginBottom: STYLES.gutters.xs,
    lineHeight: STYLES.fontSize.sm * 1.4,  
    letterSpacing: STYLES.fontSize.sm * 0.08,
  },
  summaryContainer: {
    borderTopWidth: 1,
    borderTopColor: STYLES.colors.border,
    paddingTop: STYLES.gutters.md,
    marginBottom: STYLES.gutters.md
  },
  summaryText: {
    color: STYLES.colors.text,
    fontSize: STYLES.fontSize.sm,
    lineHeight: STYLES.fontSize.sm * 1.4,  
    letterSpacing: STYLES.fontSize.sm * 0.02 ,  
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: STYLES.gutters.xl
  },
  keyword: { 
    color: STYLES.colors.lightText,
    fontSize: STYLES.fontSize.xsm,
    lineHeight: STYLES.fontSize.sm * 1.4,  
    letterSpacing: STYLES.fontSize.sm * 0.02 ,  
  },
  lastUpdate: {
    color: STYLES.colors.lightText,
    fontSize: STYLES.fontSize.xsm
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
    fontSize: STYLES.fontSize.md,
    color: STYLES.colors.white,
    fontWeight: '900',
    letterSpacing: STYLES.fontSize.md * 0.08 ,  
    textShadowColor: 'rgba(8, 140, 114, .9)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    textAlignVertical: 'center',
  },
});
