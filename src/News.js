'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  DeviceEventEmitter 
} from 'react-native';
const newsAppID = require('./api/newsConfig')

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectNews: 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=' + newsAppID,
      isLoading: true,
    }
  }

componentDidMount() {
        fetch(this.state.collectNews, {
          'headers': {'Accept': 'application/json'}
        })
        .then(res  => res.json())
        .then(res => this.setState({
          article1: res.articles[0].title,
          article2: res.articles[1].title,
          article3: res.articles[2].title

        }))
        .catch(err => console.log('news fetch error:', err))
  }

  render() {
    return (
      <View>
      <Text style={styles.newsTitle}>News:</Text>
        <Text>{this.state.article1}</Text>
        <Text>{this.state.article2}</Text>
        <Text>{this.state.article3}</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  newsTitle: {
    opacity: 0.9,
    fontSize: 24,
  },
});
