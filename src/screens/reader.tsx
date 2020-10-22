import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Text, View} from 'react-native';

export default function Reader() {
  const navigation = useNavigation();
  const route = useRoute();

  let title = route.params.data;

  useLayoutEffect(() => {
    navigation.setOptions({title: ''});
  });

  return (
    <View>
      <Text>ReaderView</Text>
    </View>
  );
}
