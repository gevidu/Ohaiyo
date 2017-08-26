'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  DeviceEventEmitter 
} from 'react-native';
const _newsAppID = require('./api/newsConfig')

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

componentDidMount() {
    // takes news api and gathers data in JSON format
        fetch('https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=' + _newsAppID, {
          'headers': {'Accept': 'application/json'}
        })
        .then(res  => res.json())
        // Returns results and shows top three news articles from BBC
        //MVP level, will switch to listView in future for less redundant code. 
        .then(res => this.setState({
          article1: res.articles[0].title,
          article2: res.articles[1].title,
          article3: res.articles[2].title,
          article4: res.articles[3].title,
          article5: res.articles[4].title,

        }))
        .catch(err => console.log('news fetch error:', err))
  }

  render() {
    return (
      // Basic text titles from articles, links added soon
      <View style={{opacity: 0.8}}>
      <Text style={styles.newsTitle}>News:</Text>
        <Text style={styles.text}>• {this.state.article1}</Text>
        <Text style={styles.text}>• {this.state.article2}</Text>
        <Text style={styles.text}>• {this.state.article3}</Text>
        <Text style={styles.text}>• {this.state.article4}</Text>
        <Text style={styles.text}>• {this.state.article5}</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  newsTitle: {
    fontFamily: 'HelveticaNeue-Light',
    textDecorationLine: 'underline',
    marginTop: 12,
    marginRight: 50,
    color: '#EBE9DC',
    fontSize: 24,
  },
  text: {
    fontFamily: 'HelveticaNeue-Light',
    marginLeft: 18,
    color: '#EBE9DC',
    fontSize: 13
  }
});
