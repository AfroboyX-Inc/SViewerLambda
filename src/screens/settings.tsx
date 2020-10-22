import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

export default function Settings() {
  useEffect(() => {
    testing();
  }, []);

  function testing() {}

  return (
    <View>
      <Text>SettingsScreen</Text>

      <Text>フォント</Text>
      <Text>文字サイズ</Text>
      <Text>余白</Text>
      <Text>文章の向き</Text>
      <Text>背景の色</Text>
      <Text>文字の色</Text>
      <Text>しおり 自動/手動</Text>
    </View>
  );
}
