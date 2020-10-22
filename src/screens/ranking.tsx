import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import {Modalize} from 'react-native-modalize';

import {percentage} from '../functions/myUtils';
import Loader from '../screens/loader';
import {getRanking, RankingOrder, Novel} from '../functions/narou';
import {website} from '../functions/novelDownloader';
import NovelInfo, {downloadButton} from './novelInfo';

export default function Ranking() {
  const [rankingList, setRankingList] = useState([] as Novel[]);
  const [type, setType] = useState(RankingOrder.total);
  const [count, setCount] = useState(1);
  const [selectedItem, setSelectedItem] = useState({} as Novel);
  const [loading, setLoading] = useState(false);
  const [whichWebsite, setWhichWebsite] = useState(website.narou);

  const modalizeRef = useRef<Modalize>({} as Modalize);
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    fetchRanking();
  }, [count]);

  async function fetchRanking() {
    setLoading(true);
    let ranking = await getRanking(type, count);

    setRankingList(rankingList.concat(ranking));

    setTimeout(() => {
      setLoading(false);
    });
  }

  return (
    <View style={styles.screenContainer}>
      <Modal children={Loader(loading)} visible={loading} transparent={true} />
      <FlatList
        data={rankingList}
        renderItem={({item, index}) => (
          <Pressable
            style={({pressed}) => [
              {backgroundColor: pressed ? 'lightgrey' : 'white'},
              styles.cellContainer,
            ]}
            onPress={() => {
              setSelectedItem(item);
              modalizeRef.current.open();
            }}
            onLongPress={() => {
              Alert.alert('ここでもダウンロードできるようにする？');
            }}>
            <Text>
              {index + 1}位 : <Text>{item.title}</Text>
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.ncode}
        onEndReached={() => {
          setCount(count + 100);
        }}
        onEndReachedThreshold={0.5}
      />
      <Modalize
        ref={modalizeRef}
        modalHeight={percentage(windowHeight, 70)}
        children={NovelInfo(selectedItem)}
        FooterComponent={downloadButton(selectedItem, whichWebsite)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  cellContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    padding: 10,
  },
});
