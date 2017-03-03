import React, { Component } from 'react';
import { getData } from './data.js';
import Issue from './Issue.js';

export default class App extends Component {
  state = {
    issues: []
  };
  componentDidMount() {
    getData().then(issues => this.setState({ issues }))
  }
  render() {
    const { issues } = this.state;
    console.log('render issues: ', issues);
    return (
      <div>
        {issues.map(issueData =>
          <Issue data={issueData} key={issueData.number} />
          /*<div>{issueData.number} </div>*/
        )}
      </div>
    )
  }
}
