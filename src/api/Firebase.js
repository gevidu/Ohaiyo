import React, { Component } from 'react';
import Dreams from '../Dreams'
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

const firebase = require('firebase');
const configs = require('./configs');
firebase.initializeApp(configs);

export class DreamTab extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Dreams />
      </View>
    );
  }
}