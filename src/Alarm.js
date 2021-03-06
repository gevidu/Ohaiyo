'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS,
  Alert,
  ListView,
  Image
} from 'react-native';
const Sound = require('react-native-sound');
const sleepyFace = require('./img/hpyslpy.png');

let wakeupArray = [];

export class Alarm extends Component {
	constructor(props) {
		var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
		super(props);
		this.state = {
      dataSource: ds.cloneWithRows(wakeupArray),
      timePicked: false
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
    
    // calculating sleep cycles, each 90 minutes and ideally happening 6 times
    while (sleepCycles < 6) {
    	sleepCycles++
      hours += 1;
    	minutes += 30;
      hours += minutes >=60;
			minutes %= 60;
			hours %= 12;

			//adds zero infront of single digit minutes
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

			//converts minutes that are displayed with a '0' infront of them back to a number
			if (typeof minutes === 'string') {
				minutes = Number(minutes.substr(1));
    	};
		};	
		
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(wakeupArray)
		});
	}

	renderRow(rowData, sectionID, rowID) {
	 	return (
	    	<TouchableOpacity 
	    		underlayColor='#dddddd' 
	    		style={styles.times}
	    		onPress={() => {this.alert(rowData)}}>
	        	<Text style={styles.listTimes} numberOfLines={1}>{rowData}</Text>
	    	</TouchableOpacity>
	  );
	}

	//popup to confirm sleep time
	alert(rowData) {
		AlertIOS.alert(
			'Wake Up Time',
			`Set Alarm for ${rowData}?`,
				[
			    {text: 'Yes', onPress: () => this.timeChosen(rowData)},
			    {text: 'Cancel', onPress: () => console.log('action canceled'), style: 'cancel'}
			  ]
		)
	}

	timeChosen(rowData){
		let wakeTime = rowData.split(':')
    console.log(wakeTime)
		let hour = new Date().getHours();
		let minute = new Date().getMinutes();		
		let startTime = new Date(0, 0, 0, hour, minute, 0);
    let endTime = new Date(0, 0, 0, wakeTime[0], wakeTime[1], 0);
    let millsUntilWake = endTime.getTime() - startTime.getTime();
    if (millsUntilWake < 0) {
		    endTime = new Date(0, 0, 1, wakeTime[0], wakeTime[1], 0);
		    millsUntilWake = endTime.getTime() - startTime.getTime();
    }
    let secondsUntilWake = millsUntilWake / 1000;
    this.setState({
			timePicked: true,
			setTime: rowData,
			secondsUntilWake: secondsUntilWake
		})

    //interval to reduce time remaining and update state or trigger the alarm 
		setInterval(() => { 
			if (this.state.secondsUntilWake > 0 && this.state.timePicked === true) {
			 this.setState({secondsUntilWake: this.state.secondsUntilWake - 5})
			} 
			if (this.state.secondsUntilWake === 0) {
					//sound to play when alarm goes off with error handling
					let alarm = new Sound('tone.mp3', Sound.MAIN_BUNDLE, (error) => {
					  if (error) {
					    console.log('error:', error);
					  } else {
					  	alarm.play();
					  	}
					});
				}
		}, 5000);
	}

	render(){
		 let alarmSettings = this.state.timePicked 
		?  (  <View style={styles.timeHasBeenSet}>
						<Text style={{color: '#FFFAF1'}}>You will be waking up at</Text>
      			<Text style={styles.text} >{this.state.setTime}</Text>	
      			
      			<Text style={{color: '#2BDE73', marginTop: 20, marginBottom: 100}} onPress={() => {this.setState({timePicked:false})}}>Cancel</Text>	
      			<Image style={{height: 130, width: 130, resizeMode: 'contain', opacity: 0.3, marginLeft: 12}} source = {sleepyFace} />	
      	  </View> ) 
    :  (  <View style={styles.container}>
				 		<TouchableOpacity onPress={() => {this.sleepStart()}} >
							<Text style={styles.button} >GET ALARM TIMES</Text>
						</TouchableOpacity>
						<ListView
						scrollEnabled={false}
						style={styles.list}
						dataSource={this.state.dataSource}  
						enableEmptySections={true} 
						renderRow={this.renderRow.bind(this)} /> 
					</View> )

		return(
			<View>
				{alarmSettings}	
			</View>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		fontFamily: 'System',
		fontWeight: '600',
		marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#181818',
    color: '#2BDE73',
    borderColor: '#2BDE73',
    borderWidth: 1,
    marginLeft: 87,
    paddingTop: 92,
    marginBottom: 20,
    marginRight: 16,
    height: 200,
    width: 200,
    borderRadius: 200/2
  },
  listTimes: {
  	fontSize: 20, 
  	color: '#FFFAF1', 
  	textAlign: 'center', 
  	fontFamily: 'HelveticaNeue-Light'
  },
  times: {
		flex: 1,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center'
  },
  list: {
  	marginTop: 10,
  },
  timeHasBeenSet: {
  	marginTop: 40,
  	backgroundColor: '#181818',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
  	color: '#FFFAF1',
  	fontSize: 100
  }
})