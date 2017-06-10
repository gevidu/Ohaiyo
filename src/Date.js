'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export class DateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	date:  new Date().getDate(),
      day:   new Date().toLocaleString('en-US', {weekday: 'long'}),
      month: new Date().toLocaleString('en-US', {month: 'long'})
    };
  }

// full second intervals to make sure it is in sync with true date
  componentDidMount() {
    setInterval(() => this.updateDate(), 1000);
  }

  updateDate() {
    this.setState({
      date:  new Date().getDate(),
      day:   new Date().toLocaleString('en-US', {weekday: 'long'}),
      month: new Date().toLocaleString('en-US', {month: 'long'})
    });
  }

  render() {
    return (
      <View>
        <Text style={styles.currentTime}> {this.state.day} </Text>
        <Text style={styles.currentTime}> {this.state.month} </Text>
        <Text style={styles.currentTime}> {this.state.date} </Text>
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

