'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { CurrentTime } from './Time';
import { Weather } from './Weather';
import { DateComponent } from './Date';
import { Alarm } from './Alarm';
import { DreamPad } from './DreamPad';
import { LeaveBy } from './LeaveBy';

const ScrollableTabView = require('react-native-scrollable-tab-view');

export class Main extends Component {
  render() {
    return (
    	<ScrollableTabView initialPage={1}>
	      <DreamPad tabLabel = 'Dreams'/>
	      <View style={styles.container} tabLabel = 'Home' >
	      	<CurrentTime />
	      	<View style={styles.dateWeatherView}>
	      		<DateComponent />
	        	<Weather />
	      	</View>
						<LeaveBy />
	      </View>
	      <Alarm tabLabel='Alarm'/>
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  dateWeatherView: {
  	flex: 4,
  	justifyContent: 'center',
  	flexDirection: 'row',
  }
});
