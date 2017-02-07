'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export class DateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	date: new Date()
    };
  }

  componentDidMount() {
    this.mountAndUpdate = setInterval(
      () => this.updateDate(),
      1000
    );
  }

  updateDate() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    switch (this.state.date.getDay()) {
    case 0:
        this.state.dw = "Sunday";
        break;
    case 1:
        this.state.dw = "Monday";
        break;
    case 2:
        this.state.dw = "Tuesday";
        break;
    case 3:
        this.state.dw = "Wednesday";
        break;
    case 4:
        this.state.dw = "Thursday";
        break;
    case 5:
        this.state.dw = "Friday";
        break;
    case 6:
        this.state.dw = "Saturday";
}

switch (this.state.date.getMonth()) {
    case 0:
        this.state.m = "January";
        break;
    case 1:
        this.state.m = "February";
        break;
    case 2:
        this.state.m = "March";
        break;
    case 3:
        this.state.m = "April";
        break;
    case 4:
        this.state.m = "May";
        break;
    case 5:
        this.state.m = "June";
        break;
    case 6:
        this.state.m = "July";
        break;
    case 7:
        this.state.m = "August";
        break;
    case 8:
        this.state.m = "September";
        break;
     case 9:
         this.state.m = "October";
         break;
     case 10:
        this.state.m = "November";
        break;
     case 11:
         this.state.m = "December";
         break;
}

//adds ordinals to date
// const th = 'ᵀᴴ'
// const st = 'st'
// const rd = 'rd'
// const nd = 'nd'
let todaysDate = this.state.date.getDate().toString();
// if (todaysDate.slice(-1) !== 1 || 2 || 3 ) {
//     this.state.d = this.state.date.getDate() + th
// } if (todaysDate.slice(-1) === 1 ) {
//     this.state.d = this.state.date.getDate() + st
// } if (todaysDate.slice(-1) === 2 ) {
//     this.state.d = this.state.date.getDate() + nd
// } if (todaysDate.slice(-1) === 3 ) {
//     this.state.d = this.state.date.getDate() + rd
// } 


    return (
      <View>
        <Text style={styles.currentTime}> {this.state.dw} </Text>
        <Text style={styles.currentTime}> {this.state.m} </Text>
        <Text style={styles.currentTime}> {this.state.date.getDate()} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  currentTime: {
    // backgroundColor: 'red',
    opacity: 0.9,
    fontSize: 36,
    color: '#ffffff'
  }
});

