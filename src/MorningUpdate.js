'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Alarm } from './Alarm';

export class MorningUpdate extends Component {
	constructor(props) {
		super(props);		
	}

	render() {
		return (
			<View>
				<Text>Morning Update</Text>
			</View>
		)
	}
}