'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  DeviceEventEmitter 
} from 'react-native';

export class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: '',
			lon: '',
			weatherSearch: '',
			skyConditions: '',
			temp: '',
			isLoading: true
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
        // Creates weather search query from coords
    		let weatherSearch = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + this.state.lon + '&units=imperial&appid=8da0bfe263e0d6cdea671f4b23e662bc';
    		this.setState({weatherSearch});
				//makes weather api call
		    fetch(this.state.weatherSearch, {
		    	'headers': {'Accept': 'application/json'}
		    })
				.then(res  => res.json())
				.then(res => this.setState({
					isLoading: false,
					skyConditions: res.weather[0].main,
					temp: Math.floor(res.main.temp) + '°'
				}))
				.catch(err => console.log('weather fetch error:', err))
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }


  render() {
  	let weatherIsLoading = this.state.isLoading ? 
      ( <ActivityIndicator size='large'/> ) :
  		( <View>
  			  <Text style={styles.title}> {this.state.skyConditions} </Text>
  			  <Text style={styles.title}> {this.state.temp} </Text>
  		  </View> )

    return (
			<View>
				{weatherIsLoading}
    	</View>
    );
  }
};

var styles = StyleSheet.create({
  title: {
  	// backgroundColor: 'yellow',
  	opacity: 0.9,
    fontSize: 54,
    // color: '#ffffff'
  },
});
