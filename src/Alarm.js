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
  DatePickerIOS
} from 'react-native';



export class Alarm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			wantedWakeup: '',
			actualWakeup: '',
			snoozeAllocation: '',
			fallAsleepTime: '',
			cycles: '',
			cycleAmount: 90,
			alarmSound: ''
		 }
	}

	componentDidMount() {
		// Requests for wakeup time
		// time spinner pops up
		// input desired time
	}



	render() {
		return(
			<View>

					<Text> Here is the alarm page! </Text>
			</View>
			)
	}
}