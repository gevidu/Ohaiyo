import React, { Component } from 'react';
import DreamList from '../DreamList';
import AddDream from '../AddDream';
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
      <View>
        <AddDream/>
        <DreamList />
      </View>
    );
  }
}