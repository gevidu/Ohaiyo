// Get time and add 14 minutes to fall asleep
// Get desidered wakeup time
// look for closest point where user is in lightest sleep near desired wake up time
// use microphone to track rustling during sleep to analyze stages
// show allocated snooze(s) between wake up time and 'get out of bed time' to not enter deep sleep again
// display traffic time and correlation with wake up time and 'get out of bed time'


'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  DatePickerIOS
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
    
    // calculating for sleep cycles, each 90 minutes and ideally happens 6 times
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

			if (hours == 0) {
				hours = 12;
			};

			wakeupArray.push(hours + ':' + minutes);
		};	
		
		this.setState({
			possibleWakeUpTimes: wakeupArray
		});
}

	render() {
		return(
			<View>
					<Text> Headed to bed? </Text>
					<TouchableOpacity onPress={() => {this.sleepStart()}}>
						<Text>Sleep Times</Text>
						
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