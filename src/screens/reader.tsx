import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ChapterSchema} from '../database/schemas';

export default function Reader() {
  const navigation = useNavigation();
  const route = useRoute();

  let title = route.params.data;

  const realm = new Realm({schema: [ChapterSchema]});

  let chapter = realm.objects('Chapter').filtered(`title = "${title}"`);

  useLayoutEffect(() => {
    navigation.setOptions({title: ''});
  });

  return (
    <ScrollView>
      <Text>{chapter[0].text}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Container: {},
  Text: {},
});
