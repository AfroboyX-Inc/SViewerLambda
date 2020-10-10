import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';

//const [novelData, setNovelData] = useState();

export default function Testing() {
  const [inputText, setInputText] = useState('');
  /*
  state = {
    text2: "",
    inputText: "",
  };
  */

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Nコードを入力"
        value={inputText}
        onChangeText={(t) => {
          setInputText(t);
        }}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log(inputText)}>
        <Text>ぼたん</Text>
      </TouchableOpacity>

      <Text>{inputText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 15,
    margin: 5,
    padding: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,

    justifyContent: 'center',
    backgroundColor: 'lightgrey',
  },
  button: {
    backgroundColor: 'lightblue',
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
