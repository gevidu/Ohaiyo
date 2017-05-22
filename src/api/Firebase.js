import React, { Component } from 'react';
import DreamList from '../DreamList';
import AddDream from '../AddDream';
import {
  StyleSheet,
  View
} from 'react-native';

//config file with API ignored for github
const config = require('./configs');
const firebase = require("firebase");

firebase.initializeApp(config);

export class FBNotes extends Component {
constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={ styles.container }>
        <AddDream />
        <DreamList />
      </View>
    );
  }
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
