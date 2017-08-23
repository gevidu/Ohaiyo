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
    // takes news api and gathers data in JSON format
        fetch(this.state.collectNews, {
          'headers': {'Accept': 'application/json'}
        })
        .then(res  => res.json())
        // Returns results and shows top three news articles from BBC
        //MVP level, will switch to listView in future for less redundant code. 
        .then(res => this.setState({
          article1: res.articles[0].title,
          article2: res.articles[1].title,
          article3: res.articles[2].title

        }))
        .catch(err => console.log('news fetch error:', err))
  }

  render() {
    return (
      // Basic text titles from articles, links added soon
      <View>
      <Text style={styles.newsTitle}>News:</Text>
        <Text style={styles.text}>{this.state.article1}</Text>
        <Text style={styles.text}>{this.state.article2}</Text>
        <Text style={styles.text}>{this.state.article3}</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  newsTitle: {
    color: '#EBE9DC',
    opacity: 0.9,
    fontSize: 24,
  },
  text: {
    color: '#EBE9DC'
  }
});
