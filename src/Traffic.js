'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  DeviceEventEmitter,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
const _trafficKey = require('./api/trafficConfig')

export class Traffic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			destination: '',
      city: '',
      trafficSearch: '',
			destinationSet: true
		}
	}

componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //gives latitude variable definition from phone's possition
        let lat = JSON.stringify(position.coords.latitude);
        this.setState({lat});
        //gives longitude variable definition from phone's possition
				let lon = JSON.stringify(position.coords.longitude);
        this.setState({lon});
        // Creates traffic search query from coords
    		let trafficSearch = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.state.lat + ',' + this.state.lon + '&destinations=San+Francisco&traffic_model=best_guess&departure_time=now&units=imperial&key=' + _trafficKey
    		this.setState({trafficSearch});
				//makes traffic api call
		    fetch(this.state.trafficSearch, {
		    	'headers': {'Accept': 'application/json'}
		    })
				.then(res  => res.json())
        .then(res => this.setState({
          distance: res.rows[0].elements[0].distance.text,
          duration: res.rows[0].elements[0].duration.text,
          isLoading: false
        }))
        .catch(err => console.log('traffic fetch error:', err))
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    let trafficLoad = this.state.isLoading ? 
      ( <ActivityIndicator size='large'/> ) :
      ( <View>
            <Text style={styles.title}> Time to Destion: {this.state.duration} </Text>
        </View> )

    return (
			<View>
          {trafficLoad}
      </View>
    );
  }
};

var styles = StyleSheet.create({
  title: {
  	opacity: 0.9,
    fontSize: 24,
    color: "#EBE9DC"
  },
  weatherContainer: {
    flex: 1
  }
});