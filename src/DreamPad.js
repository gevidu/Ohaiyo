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
         'dreamArray': ['HEY', 'HI', 'WASSUP']
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

      AsyncStorage.setItem('dreamArray');
   }

	showText() {

	}

	// createList() {
	// 	let textPreview = this.state.data.substring(0, 8);
	// 	this.state.dreamArray.push(this.state.data);
	// }

   render() {
     return (
     	<View style={styles.container}>
         <AsyncStorageExample
            data = {this.state.data}
            setData = {this.setData}
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