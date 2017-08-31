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
      let ordinalCheck = this.state.date.toString().slice(-1);
    switch (ordinalCheck) {
      case '1':
        this.setState({ordinalIndicator: 'st'})
        return;
      case '2':
        this.setState({ordinalIndicator: 'nd'})
        return;
      case '3':
        this.setState({ordinalIndicator: 'rd'})
        return;
      case '4':
        this.setState({ordinalIndicator: 'th'})
        return;
      case '5': 
        this.setState({ordinalIndicator: 'th'})
        return;
      case '6':
        this.setState({ordinalIndicator: 'th'})
        return;
      case '7':
        this.setState({ordinalIndicator: 'th'})
        return;
      case '8': 
        this.setState({ordinalIndicator: 'th'})
        return;
      case '9':
        this.setState({ordinalIndicator: 'th'})
        return;
      case '0':
        this.setState({ordinalIndicator: 'th'})
        return;
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.currentTime}> {this.state.day}, </Text>
        <Text style={styles.currentTime}> {this.state.month} </Text>
        <Text style={styles.currentTime}> {this.state.date}{this.state.ordinalIndicator}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentTime: {
    fontFamily: 'System',
    fontWeight: '100',
    fontSize: 42,
    color: '#EBE9DC'
  },
  container:{
    marginLeft: 5,
    justifyContent: 'flex-start',
  }
});

