'use strict';
import React, { Component } from 'react';
import Swipeout from 'rc-swipeout/lib';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
  AlertIOS,
  Keyboard
} from 'react-native';
const _firebase = require("firebase");
const window = Dimensions.get('window');
const add = require('./img/add.png');

export default class DreamList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loading: true,
      placeholder: 'What did you dream about?',
      text: '',
      pressStatus: false,
      date: ''
    };
    this.dreamsRef = this.getRef().child('dreams');
  }
  
  getRef() {
    return _firebase.database().ref();
  }

  //Connects to firebase and gathers items in database
  listenForItems(dreamsRef) {
    dreamsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          key: child.key,
          text: child.val().text,
          date: child.val().date
        });
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
        loading: false
      });
    });
  }

  componentDidMount() {
      this.listenForItems(this.dreamsRef);
  }

  renderRow(data){
    var swipeToDelete = [{text: 'Delete', onPress: () => {this.alert(data)}}];
    let shortenedText = data.text.substring(0,9) + '...'

    return (
      <Swipeout 
        right={swipeToDelete}
        autoClose={true}>
      <TouchableHighlight onPress={() => this.editDream(data)}>
      <View style={ styles.dreamContainer }>
        <Text style={ styles.dreamText }>{ shortenedText }</Text>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={styles.dateText}> {data.date}</Text>
        </View>
      </View>
    </TouchableHighlight>
    </Swipeout>
    );
  }

  editDream(data){
    this.setState({
      text: data.text,
      dreamId: data.key, 
      pressStatus: true
    })
  }

  deleteDream(key){
    _firebase.database().ref('dreams/'+key).set(null);
  }

  onFocusEvent(){
    if (this.state.pressStatus == false) {
      this.setState({pressStatus: true, placeholder: ''});
    }
  }

  // generic state update that is often repeated
  textInputStateUpdate() {
     this.setState({
        placeholder: 'What did you dream about?',
        text: '', 
        date: '',
        behavior: 'padding',
        pressStatus: false,
      });
  }

  //sends dream to firebase db and updates state
  submit(){
    //checks to see if you are editing an existing entry
    if (this.state.dreamId){
      var hopperRef = this.dreamsRef.child(this.state.dreamId);
      hopperRef.update({
        "text": this.state.text
      });
      if (this.state.text == '') {
          _firebase.database().ref('dreams/'+this.state.dreamId).set(null);
      }
     this.textInputStateUpdate();
    }

    //new entry to database
    if (this.state.text && this.state.dreamId == null) {
      this.dreamsRef.push({
        text: this.state.text,
        date: new Date().toLocaleDateString()
      });
      this.textInputStateUpdate();
    
      if (this.state.pressStatus == true) {
        this.setState({pressStatus: false, placeholder: 'What did you dream about?'}); 
      }
    }
  }

  //confirm delete of entries
  alert(data) {
    AlertIOS.alert(
      'Delete Dream',
      `Do you want to remove this?`,
        [
          {text: 'Yes', onPress: () => this.deleteDream(data.key)},
          {text: 'Cancel', onPress: () => console.log('Action Canceled'), style: 'cancel'}
        ]
    )
  }

  render() {
    // display of activity for user while connecting to database
    var loading;
    if(this.state.loading){
      loading = (<View>
        <Text style={styles.loadingText}>Gathering your dreams...</Text><ActivityIndicator
          animating={this.state.loading}
          style={ styles.loading }/>
        </View>
      );
    }

    // terinary operator for views depending on state
    let dreamDisplay = this.state.pressStatus ? (
        <View style={styles.inputView}>
          <TouchableOpacity style={styles.cancelAdd} onPress={() => this.setState({pressStatus: false, text: ''})}>
            <Image style={styles.cancelImage} source={add} />
          </TouchableOpacity>
          <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          placeholder={this.state.placeholder}
          placeholderTextColor={'#ffffff'}
          value={this.state.text}
          multiline={true}
          />
          <TouchableOpacity onPress={() => {this.submit()}}>
          <Text style={styles.addButton}>SAVE</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.dreamHeader}>
          <Text style={styles.headerText}> WHAT DID YOU DREAM ABOUT?</Text>
          <TouchableOpacity onPress={() => this.setState({pressStatus: true})}>
            <Image style={styles.imageAdd} source={add} />
          </TouchableOpacity>
        </View>  
      )

    return (
      <View style={ styles.container }>
        <View>
          {dreamDisplay}
        </View>
        {loading}
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
          style={ styles.dreamList }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818'
  },
  dreamHeader: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    borderBottomWidth: 1, 
    borderBottomColor: '#2BDE73', 
    padding: 15
  },
  headerText: {
    color: '#ffffff', 
    fontFamily: 'System', 
    fontSize: 14, 
    fontWeight: '600'
  },
  imputView: {
    flexDirection: 'column', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ffffff', 
    paddingBottom: 8, 
    marginTop: 4
  },
  imageAdd: {
    marginLeft: 54, 
    height: 18, 
    width: 18, 
    resizeMode: 'contain'
  },
  cancelAdd: {
    zIndex: 2, 
    position: 'absolute', 
    marginLeft: 342, 
    marginTop: 14
  },
  cancelImage: {
    height: 18, 
    width: 18, 
    resizeMode: 'contain', 
    transform: [{ rotate: '45deg'}]
  },
  dreamList: {
    height: window.height,
    backgroundColor: '#181818'
  },
  dateText: {
    fontFamily: 'System',
    fontWeight: '100',
    color: '#ffffff'
  },
  dreamContainer: {
    padding: 16,
    backgroundColor: '#181818',
    borderBottomWidth: .5,
    borderBottomColor: 'rgba(205, 205, 205, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dreamText: {
    flex: 1,
    fontFamily: 'System',
    fontWeight: '100',
    color: '#ffffff',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 12
  },
  loading: {
    padding: 8
  },
  loadingText: {
    paddingTop: 16,
    textAlign: 'center',
    color: '#b5b5b7'
  },
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
