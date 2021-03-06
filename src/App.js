import React, { Component } from 'react';
import { parse } from 'qs';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import Issues from './Issues.js';
import Milestones from './Milestones.js';
import { STYLES } from './constants.js';

export default class App extends Component {
  state = {
    issues: [],
    style: STYLES.PRINT
  };
  componentDidMount() {
    const { search } = document.location;
    const query = parse(search.slice(1));
    const { style } = query;
    switch (style) {
      case 'md':
        this.setState({ style: STYLES.MARKDOWN });
        break;
    }
  }
  render() {
    const { issues, style } = this.state;
    console.log('render issues: ', issues);
    return (
      <div className={`${style}-style`}>
        <Router history={hashHistory}>
          <Route path="/" component={Issues} />
          <Route path="/milestones" component={Milestones} />
        </Router>
      </div>
    )
  }
}
