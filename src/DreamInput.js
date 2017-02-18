import React, { Component } from 'react';
import {
   Text,
   View,
   TextInput,
   TouchableHighlight,
   StyleSheet
} from 'react-native';

export default DreamInput = (props) => {
   return (
      <View style = {styles.container}>
         <TextInput
         	multiline= {true}
            style = {styles.textInput}
            autoCapitalize = 'none'
            onChangeText = {props.setData}
            value={props.data}
         />
      </View>
   );
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0
   },
   text: {
      flex: 1,
      fontWeight: 'bold'
   },
   textInput: {
      margin: 5,
      flex: 1,
      // borderColor: 'grey',
      // borderWidth: 1
   }
});