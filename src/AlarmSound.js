'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  AlertIOS,
  Alert,
  ListView
} from 'react-native';
var Sound = require('react-native-sound');

export class AlarmSound extends Component {
	constructor(props) {
		super(props);
		this.state = {
		 }
	}

click() {
	let waha = new Sound('waha.mp3', Sound.MAIN_BUNDLE, (error) => {
	  if (error) {
	    console.log('error:', error);
	  } else {
	  	waha.play((success) => {
	  		if (success) {
	    		console.log('success');
	  		} else {
	    		console.log('failed');
	  		}
			});
	  }
	  // loaded successfully
	  console.log('duration in seconds: ' + waha.getDuration());
	});
}

	render(){
		return (
				<View>
					<TouchableOpacity onPress={() => {this.click()}}>	
						<Text style={styles.button2} >Sounds!</Text>
					</TouchableOpacity>
				</View>
			)
	}
}

const styles = StyleSheet.create({
	button2: {
		marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#252839',
    borderRadius: 4
  }
})