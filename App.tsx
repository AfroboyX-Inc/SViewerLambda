import React from 'react';
import {fromNarou} from './src/functions/novelDownloader';
import TabBarNavigator from './src/navigationConfig';

export default class App extends React.Component {
  componentDidMount() {
    /*
    let haguruma = "n4147dw"; //ruby
    let katarai = "n8467gn"; //short story
    let tenkama = "n4338fa"; //preface
    fromNarou(tenkama, 1, 0);
    //console.log(haguruma);
    */
  }

  render() {
    return <TabBarNavigator />;
  }
}
