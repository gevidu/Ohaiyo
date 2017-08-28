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

export default class AddDream extends Component {
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

  getRef() {
    return firebase.database().ref();
  }

  onFocusEvent(){
    // onFocus targets "add dream" tab for expanded text entry and animation effect
    if (this.state.pressStatus == false) {
      this.setState({pressStatus: true, placeholder: ''});
      Animated.timing(
        this.state.flexHeight,
        {toValue: 1.375}
      ).start();    
    }
  }

  submit(){
    //sends dream to firebase db, updates state, and triggers animation
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

  render(){
    let dreamDisplay = this.state.pressStatus 
    ? (
        <View style={{ flexDirection: 'column', borderBottomWidth: 1, borderBottomColor: '#ffffff', paddingBottom: 8, marginTop: 4}}>
          <TouchableOpacity style={{zIndex: 2, position: 'absolute', marginLeft: 340, marginTop: 10}} onPress={() => this.setState({pressStatus: false})}>
            <Image style={{height: 18, width: 18, resizeMode: 'contain', transform: [{ rotate: '45deg'}]}} source={add} />
          </TouchableOpacity>
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
      ) : (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 1, borderBottomColor: '#2BDE73', padding: 15}}>
          <Text style={{color: '#ffffff', fontFamily: 'System', fontSize: 14, fontWeight: '600'}}> WHAT DID YOU DREAM ABOUT?</Text>
          <TouchableOpacity onPress={() => this.setState({pressStatus: true})}>
            <Image style={{marginLeft: 54, height: 18, width: 18, resizeMode: 'contain'}} source={add} />
          </TouchableOpacity>
        </View>  
      )
    return(
      <View>
        {dreamDisplay}
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




// <Animated.View style={ this.state.pressStatus ? [styles.addFocused, {flex: this.state.flexHeight}] : [styles.addUnfocused, {flex: this.state.flexHeight}] }>
//         {dreamDisplay}
//       </Animated.View>
