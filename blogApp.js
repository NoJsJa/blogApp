import React, {Component} from 'react';
import {
  View,
  Navigator,
  StyleSheet
} from 'react-native';

import blogMain from './blogMain';

export default class blogApp extends React.Component {
    render() {
        let defaultName = 'blogMain';
        let defaultComponent = blogMain;
        return (
        <Navigator style={styles.navigator}
          initialRoute={{ name: defaultName, component: defaultComponent }}
          configureScene={(route) => {
            return Navigator.SceneConfigs.HorizontalSwipeJump;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }} />
        );
    }
}

var styles = StyleSheet.create({
  navigator: {
    backgroundColor: 'blue'
  }
});
