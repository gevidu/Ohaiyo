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
import { Dreampad } from './DreamPad';
const ScrollableTabView = require('react-native-scrollable-tab-view');

export class Main extends Component {
  render() {
    return (
    	<ScrollableTabView>
	      <Dreampad tabLabel = 'Dreams'/>
	      <View style={styles.container} tabLabel ='Home'>
	      	<CurrentTime />
	      	<View style={styles.dateWeatherView}>
	      		<DateComponent />
	        	<Weather />
	      	</View>
	      	<View>
	      		<Text>Leave By</Text>
	      		<Text>~*~Time~*~</Text>
	      	</View>
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
    backgroundColor: '#313234',
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
