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
        <View style={{borderWidth: .75, borderColor: '#d6d7da', width: 333, marginBottom: 14, marginTop: -5, opacity: 0.75}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentTime: {
    fontFamily: 'System',
		padding: 10,
		paddingTop: 2,
    fontSize: 72,
    color: '#EBE9DC'
  },
  timeContainer: {
  	alignItems: 'center',
  }
});

