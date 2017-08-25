'use strict';
import React, { Component } from 'react';
import Swipeout from 'rc-swipeout/lib';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ListView,
  ActivityIndicator,
  Switch,
  TouchableOpacity,
  Image
} from 'react-native';
const firebase = require("firebase");


export default class DreamList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loading: true
    };
    this.dreamsRef = this.getRef().child('dreams');
  }
  
  //Connects to firebase and listen gathers items in database
  getRef() {
    return firebase.database().ref();
  }

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

  deleteDream(key){
    firebase.database().ref('dreams/'+key).set(null);
  }

  renderRow = (data) => {
    let shortenedText = data.text.substring(0,9) + '...'
    return (
      <View>

      <View style={ styles.dreamContainer }>
        <Text style={ styles.dreamText }>{ shortenedText }</Text>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text style={styles.dateText}> {data.date}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => {this.deleteDream(data.key)}}>
            <Image style={ styles.Image } source={require('./img/trash.png')} />
          </TouchableOpacity>
        </View>
      </View>
    
    </View>
    );
  }
  render() {
    var loading;
    if(this.state.loading){
      loading = (<View>
        <Text style={styles.loadingText}>Gathering your dreams...</Text><ActivityIndicator
          animating={this.state.loading}
          style={ styles.loading }
        />
      </View>);
    }
    return (
      <View style={ styles.container }>
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
    flex: 1,
    backgroundColor: '#181818'
  },
  dreamList: {
    flex: 1,
    backgroundColor: '#181818'
  },
  dateText: {
    color: '#ffffff'
  },
  dreamContainer: {
    padding: 16,
    backgroundColor: '#181818',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dreamText: {
    flex: 1,
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
  }
});
