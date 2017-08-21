'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export class CurrentTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
  }

// half a second intervals to make sure it is in sync with true time as possible
  componentDidMount() {
    setInterval(() => this.updateTime(), 500);
  }

  updateTime() {
    this.setState({
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
  }

  render() {
    return (
      <View style= {styles.timeContainer}>
        <Text style={styles.currentTime}>{this.state.time}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentTime: {
		padding: 10,
		paddingTop: 2,
    fontSize: 54,
    color: '#EBE9DC'
  },
  timeContainer: {
  	flex: .1,
  	opacity: 0.9,
  	alignItems: 'center',
  	borderWidth: 1
  }
});

