import React, { Component } from 'react';
import { parse } from 'qs';
import { getMilestonesData } from './data.js';
import Milestone from './Milestone.js';
import { STYLES } from './constants.js';

export default class Milestones extends Component {
  state = {
    milestones: {},
  };
  componentDidMount() {
    getMilestonesData().
      then(milestones => this.setState({ milestones }));
  }
  render() {
    const { milestones } = this.state;
    console.log('render milestones: ', milestones);
    return (
      <div>
        {Object.values(milestones).
          sort(sortOnDueDate).
          map(milestoneData => (
          <Milestone data={milestoneData} key={milestoneData.number} />
        ))}
      </div>
    );
  }
}

function sortOnDueDate(milestoneA, milestoneB) {
  return getDueTime(milestoneA) - getDueTime(milestoneB);
}
function getDueTime(milestone) {
  return new Date(milestone.due_on).getTime();
}
