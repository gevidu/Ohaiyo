import React, { Component } from 'react';
import {
   AsyncStorage,
   AppRegistry,
   View,
   StyleSheet,
   TouchableHighlight,
   Text,
   NavigatorIOS,
   ListView
} from 'react-native';
import { DreamPad } from './DreamPad';
import AsyncStorageExample from './DreamInput';

export class DreamStore extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
    var dreamArray = ['HEY2', 'HI2', 'WASSUP2'];
    this.state = {
    	'data': '',
      'i': 0,
      dataSource: dataSource.cloneWithRows(dreamArray)
    }
  }

  renderRow(rowData, sectionID, rowID) {
 	return (
    	<TouchableHighlight underlayColor='#dddddd' style={{height:44}}>
        <View>
        <Text style={{fontSize: 20, color: '#000000'}} numberOfLines={1}>{rowData}</Text>
        <View style={{height: 1, backgroundColor: '#dddddd'}}/>
        </View>
    	</TouchableHighlight>
  );
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



	rowPressed(listerURL){
  var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

		this.props.navigator.push({
			title: 'Property',
			component: PropertyView,
			passProps: {property: property}
		});
	}

	render(){
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#313234',
  }
});





// WORK FROM AND WITH ~*~!*~*~*~*~*~*~*~* ~ ~**~* ~* ~*  *~* ~* ~* ~ *~ *~ *~ *~* ~*  *~ *~

