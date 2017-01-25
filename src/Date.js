'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export class CurrentTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	date: new Date()
    };
  }

  componentDidMount() {
    this.mountAndUpdate = setInterval(
      () => this.updateDate(),
      180000
    );
  }

  updateDate() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentTime: {
    fontSize: 36
  }
});

