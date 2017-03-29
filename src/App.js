import React, { Component } from 'react';
import { parse } from 'qs';
import { getData } from './data.js';
import Issue from './Issue.js';
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
    getData().then(issues => this.setState({ issues }))
  }
  render() {
    const { issues, style } = this.state;
    console.log('render issues: ', issues);
    return (
      <div className={`${style}-style`}>
        {issues.map(issueData =>
          <Issue data={issueData} key={issueData.number} style={style}/>
          /*<div>{issueData.number} </div>*/
        )}
      </div>
    )
  }
}
