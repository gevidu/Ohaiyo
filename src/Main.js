'use strict';
import React, { Component } from 'react';
import { CurrentTime } from './Time';
import { Weather } from './Weather';
import { DateComponent } from './Date';
import { Alarm } from './Alarm';
import { DreamTab } from './api/Firebase';
import { News } from './News';
import { Traffic } from './Traffic';
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
      locked: true,
    }
  }

  render() {
    return (
    	<View style={styles.timeContainer}>
      	<ScrollableTabView 
          tabBarPosition = 'bottom'
          locked = {this.state.locked}
      		style={styles.tabView} 
          prerenderingSiblingsNumber={Infinity}
      		tabBarActiveTextColor={'#EBE9DC'} 
          tabBarInactiveTextColor={'#68757D'}
          tabBarUnderlineStyle={{backgroundColor: '#EBE9DC'} }
      		initialPage={1}>
          <Alarm tab = '1' tabLabel='Alarm'/>
          <View tab = '2' style={styles.container} tabLabel = 'Home' >
            <CurrentTime />
            <View style={styles.dateWeatherView}>
              <DateComponent />
              <Weather />
            </View>
            <View>
              <News />
              <Traffic />
            </View>
          </View>
  	      <DreamTab tab = '3' tabLabel = 'Dreams' />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818'
  },
  tabView: {
  	borderColor: '#ffffff'
  },
  timeContainer: {
		flex: 1,
    backgroundColor: '#181818',
  },
  dateWeatherView: {
  	flexDirection: 'row',
  }
});
