import React, { Component } from 'react';
import {
   AsyncStorage,
   AppRegistry,
   View,
   StyleSheet
} from 'react-native';
import AsyncStorageExample from './DreamInput';

export class DreamPad extends Component {
   constructor() {
      super();
      this.state = {
         'data': '',
         'i': 0,
         'dreamArray': []
      }
   }
   componentDidMount = () => {
      AsyncStorage.getItem('data').then((value) => {
         this.setState({'data': value});
      });
   }
   setData = (value) => {
      AsyncStorage.setItem('data', value);
      this.setState({'data': value});
   }

	showText() {

	}

	// createList() {
	// 	let textPreview = this.state.data.substring(0, 8);
	// 	this.state.dreamArray.push(this.state.data);
	// }

   render() {
   	// while (this.state.i < this.state.dreams.length, this.state.i++) {
   	// }

     return (
     	<View style={styles.container}>
         <AsyncStorageExample
            data = {this.state.data}
            setData = {this.setData}
            onClick = {this.showText.bind(this)}
         />
        </View>
      );
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
 })