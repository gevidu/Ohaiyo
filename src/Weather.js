'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  DeviceEventEmitter,
  Image,
  TouchableOpacity
} from 'react-native';
const _appID = require('./api/weatherConfig');
const icon = require('./img/weatherIcons/weatherIcons');


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
        //gives latitude variable definition from phone's possition
        let lat = JSON.stringify(position.coords.latitude);
        this.setState({lat});
        //gives longitude variable definition from phone's possition
				let lon = JSON.stringify(position.coords.longitude);
        this.setState({lon});
        // Creates weather search query from coords
    		let weatherSearch = 'http://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + this.state.lon + '&units=imperial&appid='+ _appID;
    		this.setState({weatherSearch});
				//makes weather api call
		    fetch(this.state.weatherSearch, {
		    	'headers': {'Accept': 'application/json'}
		    })
				.then(res  => res.json())
				.then(res => this.setState({
          skyConditions: res.weather[0].main,
          temp: Math.floor(res.main.temp) + '°',
					isLoading: false
        }))
        .catch(err => console.log('weather fetch error:', err))
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    let skyCons = this.state.skyConditions;
    let imageLookupTable = {
      "Haze": () => {
        return icon.haze;
      },
      "Clear": () => {
        return icon.clear;
      },
      "Rain": () => {
        return icon.rain;
      },
      "Snow": () => {
        return icon.snow;
      },
      "Thunderstorms": () => {
        return icon.thunderstorms;
      },
      "Partly Cloudy": () => {
        return icon.partlyCloudy;
      },
      "Mist": () => {
        return icon.mist;
      },
      "Clouds": () => {
        return icon.clouds;
      },
      "Fog": () => {
        return icon.mist;
      }
    };

    let weatherIsLoading = this.state.isLoading ? 
      ( <ActivityIndicator size='large'/> ) :
      ( <View style={styles.weatherContainer}>
          <Image style={styles.image} source = {imageLookupTable[skyCons]()} />
          <Text style={styles.title}> {this.state.skyConditions} | {this.state.temp} </Text>
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
    fontFamily: 'System',
    fontWeight: '100',
    fontSize: 24,
    color: "#EBE9DC"
  },
  image: {
    marginRight: 20,
    marginBottom: 5,
    width: 175,
    height: 175,
    resizeMode: 'contain'
  },
  weatherContainer: {
    marginTop: 5,
    marginRight: 3,
  }
});
