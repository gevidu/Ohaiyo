'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export class DateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	date: new Date()
    };
  }

// full second intervals to make sure it is in sync with true date
  componentDidMount() {
    setInterval(() => this.updateDate(), 1000);
  }

  updateDate() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <View>
        <Text style={styles.currentTime}> {this.state.date.toLocaleString('en-US', {weekday: 'long'})} </Text>
        <Text style={styles.currentTime}> {this.state.date.toLocaleString('en-US', {month: 'long'})} </Text>
        <Text style={styles.currentTime}> {this.state.date.getDate()} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentTime: {
    opacity: 0.9,
    fontSize: 36,
  }
});

