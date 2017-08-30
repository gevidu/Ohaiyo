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
  TextInput,
  Linking
} from 'react-native';
const _trafficKey = require('./api/trafficConfig');

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
        let trafficSearch = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.state.lat + ',' + this.state.lon + '&destinations=Portland+OR&traffic_model=best_guess&departure_time=now&units=imperial&key=' + _trafficKey
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
      ( <View style={styles.container}>
            <Text style={styles.title}> Time to Destination: </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://maps.google.com/maps/dir/' + this.state.lat + ',' + this.state.lon + '/Portland+OR')}>
              <Text style={styles.duration}> {this.state.duration} </Text>
            </TouchableOpacity>
            <Text style={styles.instructions}> click to open in maps </Text>
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
    fontFamily: 'System',
    fontWeight: '200',
    fontSize: 22,
    color: "#EBE9DC"
  },
  instructions: {
    fontFamily: 'System',
    fontWeight: '100',
    fontSize: 8,
    color: "#EBE9DC"
  },
  duration: {
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 30,
    color: "#EBE9DC"
  },
  container: {
    marginTop: 80,
    alignItems: 'center'
  }
});