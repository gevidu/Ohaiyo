import React, { Component } from 'react';
import Swipeout from 'rc-swipeout/lib';
// import 'rc-swipeout/assets/index.less';
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
    return (
      <View>

      <View style={ styles.dreamContainer }>
        <Text style={ styles.dreamText }>{ data.text }</Text>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
          <Text>{data.date}</Text>
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
    flex: 1
  },
  dreamList: {
    flex: 1
  },
  dreamContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dreamText: {
    flex: 1,
    color: '#252839',
    fontSize: 16
  },
  Image: {
    opacity: 0.6,
    tintColor: '#313234'
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
