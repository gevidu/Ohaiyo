'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { CurrentTime } from './Time';
import { Weather } from './Weather';
import { DateComponent } from './Date';
const ScrollableTabView = require('react-native-scrollable-tab-view');

export class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
      <CurrentTime />
      <View>
      <DateComponent />
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
