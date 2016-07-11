import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import navigatorComponent from './blogNavigator';

var REQUEST_URL = 'http://192.168.23.1:8080/chatRoom/blog.do?action=readList&blogAuthor=Johnson';

class blogApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderBlog}
        style={styles.listView}
      />
      <navigatorComponent></navigatorComponent>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          博客正在加载...
        </Text>
      </View>
    );
  }

  renderBlog(blog) {
    return (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text style={styles.title}>{blog.title}</Text>
          <Text style={styles.other}>{blog.author}</Text>
          <Text style={styles.other}>{blog.abstract}</Text>
          <Text style={styles.other}>{blog.dates}</Text>
          <Text style={styles.other}>{blog.tag}</Text>
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    borderColor: '#00FFFF',
    borderWidth: 1,
    width: 300,
    marginTop: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    backgroundColor: '#458B00',
    color: '#ffffff',
  },
  other: {
    textAlign: 'center',
    marginBottom: 2,

  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('blogApp', () => blogApp);
