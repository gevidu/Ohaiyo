'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Animated,
  Image
} from 'react-native';
const firebase = require("firebase");
let add = require('./img/add.png');
const window = Dimensions.get('window');

export default class DreamEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: 'What did you dream about?',
      text: '',
      pressStatus: false,
      flexHeight: new Animated.Value(.075),
      date: ''
    };
    this.dreamsRef = this.getRef().child('dreams');
  }
  
  render(){
    return(
        <View style={{ flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: '#ffffff', paddingBottom: 8, marginTop: 4}}>
          <TextInput
          // onFocus={this.onFocusEvent.bind(this)}
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.placeholder}
          placeholderTextColor={'#ffffff'}
          value={this.state.text}
          multiline={true}
          />
          <TouchableOpacity onPress={() => {this.submit()}}>
          <Text style={styles.addButton}>ADD DREAM</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  addUnfocused: {
    paddingTop: 5,
    flex: .075,
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    paddingBottom: 13,
    borderBottomColor: '#ffffff',
    backgroundColor: '#181818'
  },
  addFocused: {
    paddingTop: 5,
    flex: .075,
    flexDirection: 'column',
    marginBottom: 10,
    backgroundColor: '#181818'

  },
  textInput: {
    fontSize: 16,
    height: window.height/3 * 1.5,
    fontFamily: 'System',
    fontWeight: '100' ,
    color: '#ffffff',
    backgroundColor: '#181818',
    marginTop: 26,
    marginLeft: 16,
    marginRight: 8,
  },
  addButton: {
    opacity: 0.9,
    fontFamily: 'System', 
    fontWeight: '500',
    textAlign: 'center',    
    fontSize: 16,
    backgroundColor: '#181818',
    color: '#2BDE73',
    borderColor: '#2BDE73',
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4
  }
});

