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
    this.updateClock = setInterval(
      () => this.updateTime(),
      500
    );
  }

  updateTime() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <View>
        <Text>{this.state.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
      </View>
    );
  }
}

