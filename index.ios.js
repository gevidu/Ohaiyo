'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { CurrentTime } from './src/Time';
import { Weather } from './src/Weather';
const ScrollableTabView = require('react-native-scrollable-tab-view');


export default class Ohaiyo extends Component {
  render() {
    return (
      <View style={styles.container}>
      <CurrentTime />
      <View>
        <Weather />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Ohaiyo', () => Ohaiyo);
