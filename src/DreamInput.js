import React, { Component } from 'react';
import {
   Text,
   View,
   TextInput,
   TouchableHighlight,
   StyleSheet
} from 'react-native';

export default AsyncStorageExample = (props) => {
         // <Text style = {styles.text}>
            // {props.data}
         // </Text>
   return (
      <View style = {styles.container}>
         <TextInput
         		multiline={true}
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
      marginTop: 70
   },
   text: {
      flex: 1,
      fontWeight: 'bold'
   },
   textInput: {
      // margin: 15,
      flex: 1,
      borderColor: 'grey',
      borderWidth: 1
   }
});