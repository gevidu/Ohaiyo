'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter 
} from 'react-native';

export class Weather extends Component {
	constructor(props) {
		super(props);
	}

componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
      	console.log(position);
        // var initialPosition = JSON.stringify(position);
        // this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }


  render() {
    return (
<View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          
        </Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
