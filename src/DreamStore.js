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
import DreamInput from './DreamInput';

export class DreamStore extends Component {
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
    let dreamArray = ['HEY2', 'HI2', 'WASSUP2'];
    this.state = {
    	'data': '',
      'dreamArray': [],
      'i': 0,
      dataSource: dataSource.cloneWithRows(dreamArray)
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


  renderRow(rowData, sectionID, rowID) {
    let textPreview = this.state.data.substring(0, 9);
    textPreview = textPreview + '...';
  return (
      <TouchableHighlight underlayColor='#dddddd' style={{height:44}}>
        <View>
        <Text style={{fontSize: 20, color: '#000000'}} numberOfLines={1}>{rowData}</Text>
        <View style={{height: 1, backgroundColor: '#dddddd'}}/>
        </View>
      </TouchableHighlight>
  );
}

AddRow() {
  console.log('ADD ROW PUSH')
  this.state.dreamArray.push('+1');
}


	render(){
    let add = '+';
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
          <TouchableHighlight onPress={this.AddRow.bind(this)}>
          <Text>{add}</Text>
          </TouchableHighlight>
      </View>
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





// renderRow(rowData, sectionID, rowID) {
//     let textPreview = this.state.data.substring(0, 9);
//     textPreview = textPreview + '...';
    
//     return (
//         <TouchableHighlight underlayColor='#dddddd' style={{height:45}}>
//           <View>
//             <Text>{textPreview}</Text>
//              <DreamInput
//                 data = {this.state.data}
//                 setData = {this.setData}
//              />
//           </View>
//         </TouchableHighlight>
//     );
// }
