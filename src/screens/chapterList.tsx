import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect} from 'react';
import {Pressable, SectionList, StyleSheet, Text, View} from 'react-native';

export default function ChapterList() {
  const navigation = useNavigation();
  const route = useRoute();

  let param = route.params.data;

  let DATA = param.sections.map((item: any, index: number) => ({
    title: item.title,
    data: param.sections[index].chapters.map((item: any) => {
      return item.title;
    }),
  }));

  useLayoutEffect(() => {
    navigation.setOptions({title: param.title});
  });

  useEffect(() => {});

  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      initialNumToRender={20}
      renderItem={({item}) => {
        return (
          <Pressable
            style={(pressed) => [
              {backgroundColor: pressed ? 'lightgrrey' : 'white'},
              styles.cellContainer,
            ]}
            onPress={() => {
              navigation.navigate('reader', {
                data: item,
              });
            }}>
            <Text>{item}</Text>
          </Pressable>
        );
      }}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
    />
  );
}

let styles = StyleSheet.create({
  cellContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    padding: 10,
  },
  sectionHeader: {
    backgroundColor: 'lightgrey',
  },
});
