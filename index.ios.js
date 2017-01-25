'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Main } from './src/Main'

export default class Ohaiyo extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('Ohaiyo', () => Ohaiyo);
