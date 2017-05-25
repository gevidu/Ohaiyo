'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export class Alarm extends Component {
	constructor(props) {
		super(props);
		this.state = {
      possibleWakeUpTimes: []
		 }
	}

	sleepStart(){
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let sleepCycles = 0;
		let wakeupArray = [];

		// takes ~14 minutes to fall asleep
    minutes += 14;
		hours += minutes >= 60;
		minutes %= 60;
		hours %= 12;
    
    // calculating sleep cycles, each 90 minutes and ideally happens 6 times
    while (sleepCycles < 6) {

    	sleepCycles++
      hours += 1;
    	minutes += 30;
      hours += minutes >=60;
			minutes %= 60;
			hours %= 12;

			if (minutes < 10) {
				minutes = ('0' + minutes).slice(-2);
			};
			if (minutes > 10) {
				minutes = minutes
			}; 
			if (hours == 0) {
				hours = 12;
			};
			
			wakeupArray.push(hours + ':' + minutes);

			if (typeof minutes === 'string') {
				minutes = Number(minutes.substr(1));
    	};



		};	
		
		this.setState({
			possibleWakeUpTimes: wakeupArray
		});
}

	render() {
		return(
			<View>
					<TouchableOpacity onPress={() => {this.sleepStart()}}>
						<Text style={styles.button} >Get Sleep Times</Text>
					</TouchableOpacity>
				<Text>{this.state.possibleWakeUpTimes[0]}</Text>
				<Text>{this.state.possibleWakeUpTimes[1]}</Text>
				<Text>{this.state.possibleWakeUpTimes[2]}</Text>
				<Text>{this.state.possibleWakeUpTimes[3]}</Text>
				<Text>{this.state.possibleWakeUpTimes[4]}</Text>
				<Text>{this.state.possibleWakeUpTimes[5]}</Text>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	button: {
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