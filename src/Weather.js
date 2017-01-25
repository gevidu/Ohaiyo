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
		this. state = {
			lat: '',
			lon: ''
		}
	}

componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //gives latitude variable definition
        let lat = JSON.stringify(position.coords.latitude);
        this.setState({lat});
        //gives longitude variable definition
				let lon = JSON.stringify(position.coords.longitude);
        this.setState({lon});
        // Creates weather search query
    		let weatherSearch = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + this.state.lon + '&appid=8da0bfe263e0d6cdea671f4b23e662bc';
    		this.setState({weatherSearch});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  //   fetch(weatherSearch, { 
  //    	 headers: {'Accept': 'application/json'}
		// })
		// .then(res => res.json())
		// .then(console.log(res))
  }


  render() {
    return (
<View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.lat}
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
