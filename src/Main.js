'use strict';

import React, { Component } from 'react';
import { CurrentTime } from './Time';
import { Weather } from './Weather';
import { DateComponent } from './Date';
import { Alarm } from './Alarm';
import { DreamPad } from './DreamPad';
import { LeaveBy } from './LeaveBy';
import { FBNotes } from './api/Firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
const ScrollableTabView = require('react-native-scrollable-tab-view');

export class Main extends Component {
  render() {
    return (
    	<View style={styles.timeContainer}>
	      	
    	<ScrollableTabView 
    		style={styles.tabView} 
    		tabBarActiveTextColor={'#000000'} 
        tabBarInactiveTextColor={'#68757D'}
        // tabBarActiveTextColor={'#ffffff'} 
    		// tabBarInactiveTextColor={'#F3A5A7'}
    		initialPage={1}>
        <Alarm tabLabel='Alarm'/>
        <View style={styles.container} tabLabel = 'Home' >
          <CurrentTime />
          <View style={styles.dateWeatherView}>
            <DateComponent />
            <Weather />
          </View>
            <LeaveBy />
        </View>
	      <FBNotes tabLabel = 'Dreams'/>
      </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#313234',
  },
  tabView: {
  	borderColor: '#ffffff'
  },
  timeContainer: {
		flex: 1,
		// backgroundColor: '#313234'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    // color: '#333333',
    marginBottom: 5,
  },
  dateWeatherView: {
  	flex: .75,
  	justifyContent: 'center',
  	flexDirection: 'row',
  }
});
