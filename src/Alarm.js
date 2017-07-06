'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  AlertIOS,
  Alert,
  ListView
} from 'react-native';

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

	componentDidMount() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(wakeupArray)
		})
	}


	sleepStart(){
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let sleepCycles = 0;
				wakeupArray = [];

		// takes ~14 minutes to fall asleep
    minutes += 14;
		hours += minutes >= 60;
		minutes %= 60;
		hours %= 12;
    
    // calculating sleep cycles, each 90 minutes and ideally happens 6 times
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
			if (minutes > 10) {
				minutes = minutes
			}; 
			if (hours == 0) {
				hours = 12;
			};
			
			wakeupArray.push(hours + ':' + minutes);

			//adds zero infront of single digit minutes
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
	    	<TouchableHighlight 
	    		underlayColor='#dddddd' 
	    		style={styles.times} 
	    		onPress={() => {this.alert(rowData)}}>
	        	<Text style={{fontSize: 20, color: '#000000', textAlign: 'center'}} numberOfLines={1}>{rowData}</Text>
	    	</TouchableHighlight>
	  );
	}

	alert(rowData) {
		AlertIOS.alert(
	'Wake Up Time',
	`Set Alarm for ${rowData}?`,
	  [
	    {text: 'Yes', onPress: () => this.timeChosen(rowData)},
	    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
	  ]
		)
	}

	timeChosen(rowData){
		let wakeTime = rowData.split(':')
		let wakeHours = Number(wakeTime[0])
		let wakeMinutes = Number(wakeTime[1])
		let hour = new Date().getHours();
		let minute = new Date().getMinutes();		
		let startDate = new Date(0, 0, 0, hour, minute, 0);
    let endDate = new Date(0, 0, 1, wakeTime[0], wakeTime[1], 0);
    let milsTilWake = endDate.getTime() - startDate.getTime();

    this.setState({
			timePicked: true,
			setTime: rowData,
			millisecondsUntilWake: milsTilWake
		})	

	}

	render() {
		 let alarmSettings = this.state.timePicked 
		?  (  <View style={styles.timeHasBeenSet}>
						<Text style={{color: '#FFFAF1'}}>You will be waking up at</Text>
      			<Text style={styles.text}>{this.state.setTime}</Text>	
      			<Text style={{color: '#FFFAF1', marginTop: 10}}>Sleep Well :)</Text>
      			<Text style={{color: '#FFFAF1', marginTop: 10, marginBottom: 500}} onPress={() => {this.setState({timePicked:false})}}>Cancel</Text>		
      	  </View> ) 
    :  (  <View>
				 		<TouchableOpacity onPress={() => {this.sleepStart()}}>
							<Text style={styles.button} >Get Sleep Times</Text>
						</TouchableOpacity>
						<ListView
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
		marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#252839',
    borderRadius: 4
  },
  times: {
			flex: 1,
			height: 45
  },
  list: {
  	marginTop: 10
  },
  timeHasBeenSet: {
  	backgroundColor: '#47374D',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
  	color: '#FFFAF1',
  	fontSize: 70
  }
})