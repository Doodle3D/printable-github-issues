import React, { Component } from 'react';
import { parse } from 'qs';
import { getIssues } from './data.js';
import Issue from './Issue.js';
import { STYLES } from './constants.js';

export default class Issues extends Component {
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
    getIssues().then(issues => this.setState({ issues }))
  }
  render() {
    const { issues, style } = this.state;
    console.log('render issues: ', issues);
    return (
      <div>
        {issues.map(issueData =>
          <Issue data={issueData} key={issueData.number} style={style}/>
        )}
      </div>
    );
  }
}
