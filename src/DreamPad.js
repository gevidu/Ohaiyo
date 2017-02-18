import React, { Component } from 'react';
import {
   AsyncStorage,
   AppRegistry,
   View,
   StyleSheet,
   Text
} from 'react-native';
import DreamInput from './DreamInput';

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
   }

	// showText() {

	// }

	// createList() {
 //    this.state.dreamArray.push(this.state.data);
 //  }

   render() {
		let textPreview = this.state.data.substring(0, 10);
    textPreview = textPreview + '...';

     return (
     	<View style={styles.container}>
         <Text>{textPreview}</Text>
         <DreamInput
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