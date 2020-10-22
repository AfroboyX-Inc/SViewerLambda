import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Modal,
  Keyboard,
  Alert,
} from 'react-native';
import {Modalize} from 'react-native-modalize';

import {percentage} from '../functions/myUtils';
import {searchNarou, SearchOrder, Novel} from '../functions/narou';
import {website} from '../functions/novelDownloader';
import Loader from './loader';
import NovelInfo, {downloadButton} from './novelInfo';

export default function Search() {
  const [resultList, setResultList] = useState([] as Novel[]);
  const [order, setOrder] = useState(SearchOrder.newestUpdate);
  const [count, setCount] = useState(1);
  const [searchBarText, setSearchBarText] = useState('');
  const [selectedItem, setSelectedItem] = useState({} as Novel);
  const [loading, setLoading] = useState(false);
  const [whichWebsite, setWhichWebsite] = useState(website.narou);

  const modalizeRef = useRef<Modalize>({} as Modalize);
  const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    fetchSearch();
  }, [count]);

  async function fetchSearch() {
    setLoading(true);

    if (searchBarText != '') {
      let result = await searchNarou(order, count, searchBarText);

      setResultList(resultList.concat(result));
    }

    setTimeout(() => {
      setLoading(false);
    });
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={'検索〜'}
          value={searchBarText}
          clearButtonMode={'while-editing'}
          onChangeText={(text) => {
            setSearchBarText(text);
          }}
          onKeyPress={() => {
            setResultList([]);
          }}
          onSubmitEditing={() => {
            fetchSearch();
          }}
        />
      </View>

      <Modal children={Loader(loading)} visible={loading} transparent={true} />

      <FlatList
        data={resultList}
        renderItem={({item}) => (
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
            <Text>{item.title}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.ncode}
        onEndReached={() => {
          setCount(count + 100);
        }}
        onScrollBeginDrag={() => {
          Keyboard.dismiss();
        }}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
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
    //alignContent: 'center',
    //alignItems: 'center',
  },
  searchBarContainer: {
    width: '100%',
    height: 40,
    backgroundColor: 'lightgrey',
  },
  searchBar: {
    fontSize: 15,
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  cellContainer: {
    fontSize: 23,
    height: 50,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
  },
});
