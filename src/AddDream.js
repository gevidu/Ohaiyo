import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Animated
} from 'react-native';
const firebase = require("firebase");

export default class AddDream extends Component {
  constructor(props) {
    super(props);
    // this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.state = {
      placeholder: 'What did you dream about?',
      text: '',
      pressStatus: false,
      flexHeight: new Animated.Value(.075),
      date: ''
    };
    this.dreamsRef = this.getRef().child('dreams');
  }

  getRef() {
    return firebase.database().ref();
  }

  submit(){

    if (this.state.text) {
      this.dreamsRef.push({
        text: this.state.text,
        date: new Date().toLocaleDateString()
      });

      this.setState({
        placeholder: 'What did you dream about?',
        text: '', 
        date: '',
        behavior: 'padding',
        pressStatus: false,
      });
             if (this.state.pressStatus == true) {
      this.setState({pressStatus: false, placeholder: 'What did you dream about?'});
      Animated.timing(
        this.state.flexHeight,
        {toValue: .075}
      ).start();    
    }
    }
  }

  onFocusEvent(){
    if (this.state.pressStatus == false) {
      this.setState({pressStatus: true, placeholder: ''});
      Animated.timing(
        this.state.flexHeight,
        {toValue: 1.375}
      ).start();    
    }
  }

  // onBlurEvent(){
  //   if (this.state.pressStatus == true) {
  //     this.setState({pressStatus: false, placeholder: 'What did you dream about?'});
  //     Animated.timing(
  //       this.state.flexHeight,
  //       {toValue: .075}
  //     ).start();    
  //   }
  // }

  render(){
    return(

      <Animated.View
      behavior={this.state.behavior}
      // onBlur={this.onBlurEvent.bind(this)}
      style={ this.state.pressStatus ? [styles.addFocused, {flex: this.state.flexHeight}] : [styles.addUnfocused, {flex: this.state.flexHeight}] }
      >
        <TextInput
      onFocus={this.onFocusEvent.bind(this)}
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.placeholder}
          value={this.state.text}
          multiline={true}
        />
        <TouchableOpacity onPress={() => {this.submit()}}>
          <Text style={styles.addButton}>Add</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  addUnfocused: {
    paddingTop: 5,
    flex: .075,
    flexDirection: 'row'
  },
  addFocused: {
    paddingTop: 5,
    flex: .075,
    flexDirection: 'column',
    marginBottom: 10
  },
  textInput: {
    flex: 1,
    color: '#252839',
    marginLeft: 16,
    marginRight: 8,
    height: (Platform.OS == 'android') ? 38 : 100,
    borderWidth: 0
  },
  addButton: {
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
  }
});
