import React, {useEffect} from 'react';
import TabBarNavigator from './src/navigationConfig';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <TabBarNavigator />;
}
