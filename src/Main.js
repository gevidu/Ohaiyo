'use strict';

import React, { Component } from 'react';
import { CurrentTime } from './Time';
import { Weather } from './Weather';
import { DateComponent } from './Date';
import { Alarm } from './Alarm';
import { DreamPad } from './DreamPad';
import { LeaveBy } from './LeaveBy';
import { MorningUpdate } from './MorningUpdate';
import { FBNotes } from './api/Firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
const ScrollableTabView = require('react-native-scrollable-tab-view');

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      i: 1
    }
  }

  // handleChangeTab() {
  //   this.state.i++;
  //   if (this.state.locked == false && this.state.i/2) {
  //     this.setState({locked:true});
  //   } else {
  //   this.setState({locked: false})
  //   }
  // }

  render() {
    return (
    	<View style={styles.timeContainer}>
      	<ScrollableTabView 
          // tabBarPosition = 'bottom'
          // onChangeTab = {this.handleChangeTab.bind(this)}
          locked = {this.state.locked}
      		style={styles.tabView} 
          prerenderingSiblingsNumber={Infinity}
      		tabBarActiveTextColor={'#000000'} 
          tabBarInactiveTextColor={'#68757D'}
      		initialPage={1}>
          <Alarm tab = '1' tabLabel='Alarm'/>
          <View tab = '2' style={styles.container} tabLabel = 'Home' >
            <CurrentTime />
            <View style={styles.dateWeatherView}>
              <DateComponent />
              <Weather />
            </View>
            <View>
              <MorningUpdate />
              <LeaveBy />
            </View>
          </View>
  	      <FBNotes tab = '3' tabLabel = 'Dreams' />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabView: {
  	borderColor: '#ffffff'
  },
  timeContainer: {
		flex: 1,
  },
  dateWeatherView: {
  	flex: .75,
  	justifyContent: 'center',
  	flexDirection: 'row',
  }
});
