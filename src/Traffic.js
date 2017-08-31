'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableHighlight,
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
      destinationSet: false
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
        let trafficSearch = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + this.state.lat + ',' + this.state.lon + '&destinations='+ this.state.destination +'&traffic_model=best_guess&departure_time=now&units=imperial&key=' + _trafficKey
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

  destinationSubmit(){
    let destination = this.state.text.replace(/\s/g, "+");
    this.setState({
      destination: destination,
      destinationSet: true
    })
    this.componentWillMount();
  }


  render() {
    //ternary operator for traffic view state
    // let trafficLoad = this.state.isLoading ? 
    //   ( <ActivityIndicator size='large'/> ) :
    //   ( {trafficView} )

    let trafficView = this.state.destinationSet ? 
    (
      <View style={styles.container}>
            <Text style={styles.title}> Time to Destination: </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://maps.google.com/maps/dir/' + this.state.lat + ',' + this.state.lon + '/' + this.state.destination)}>
              <Text style={styles.duration}> {this.state.duration} </Text>
            </TouchableOpacity>
            <Text style={styles.instructions}> click to open in maps </Text>
        </View> 
      ) : (
        <View style={styles.destinationInputView}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({text})}
            placeholder={'Enter Destination'}

            placeholderTextColor='rgba(255,255,255, .5)'
            value={this.state.text}/>
          <TouchableHighlight 
            onPress={() => {this.destinationSubmit()}}>
            <Text style={styles.button}>ADD</Text> 
          </TouchableHighlight>
        </View>
    )


    return (
      <View>
          {trafficView}
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
  destinationInputView: {
    marginTop: 88, 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: 300, 
    height: 32
  },
  textInput: {
    paddingLeft: 8,
    borderColor: '#EBE9DC',
    borderWidth: .5,
    width: 240,
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '100' ,
    color: '#ffffff',
  }, 
  button: {
    fontSize: 14,
    fontWeight: '200',
    backgroundColor: '#181818',
    color: '#EBE9DC',
    borderColor: '#EBE9DC',
    marginLeft: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: .5,
    borderRadius: 4
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