import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
  RefreshControl
} from 'react-native';

import ListItem from './components/ListItem'

const API_URL = "https://api.reddit.com/r/pics/new.json";
const WEB_URL = "https://www.reddit.com";

/**
 * class App definition
 * 
 * @export
 * @class App
 * @extends {React.Component}
 */
export default class App extends React.Component {
  /**
   * Creates an instance of App.
   * @param {any} props 
   * @memberof App
   */
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      data: []
    };
  }

  /**
   * It is automatically called before render()
   * 
   * @memberof App
   */
  componentWillMount() {
    this.getListData();
  }

  /**
   * Executed when user presses an item
   * 
   * @memberof App
   */
  handlePress(item) {
    console.log('Item pressed');
    // Open post link in webview
    let urlToOpen = WEB_URL + item.data.permalink;

    Linking.canOpenURL(urlToOpen).then(supported => {
      if (supported) {
        Linking.openURL(urlToOpen);
      } else {
        console.log('Don\'t know how to open URI: ' + urlToOpen);
      }
      return false
    });
  }

  /**
   * Refresh the list when pulled
   * 
   * @memberof App
   */
  handleRefresh() {
    console.log('List pulled');
    this.setState({ refreshing: true });
    this.getListData().then(() => {
      this.setState({ refreshing: false });
    });
  }

  /**
   * Get data from Reddit Api
   * 
   * @memberof App
   */
  getListData() {
    return fetch(API_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        // Save the array of results
        this.setState({ data: responseJson.data.children });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Render List
   * 
   * @returns 
   * @memberof App
   */
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.data.id}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPress={() => this.handlePress(item)}
            />)
          }
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh.bind(this)}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: '#ffffff'
  },
});
