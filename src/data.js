import 'whatwg-fetch';

export function getIssues(state='open') {
  return loadIssues(state);
}

function loadIssues(state) {
  return fetch(`/data/issues.json?state=${state}`)
  .then(response => {
    if (!response.ok) { // error response
      return response.text() // parse error text
      .then(text => {
        throw Error(text);
      });
    } else {
      return response.json();
    }
  });
}

export function getMilestonesData() {
  return getIssues('all').
    then(convertToMilestones).
    then(addSizes);
}
// convert issues into milestones with issues
function convertToMilestones(issues) {
  // console.log('convertToMilestones issues: ', issues);
  const milestones = {};
  for (const issue of issues) {
    // ignore issues without milestones
    if (!issue.milestone) continue;
    // ignore issues of milestones that are not open
    if(issue.milestone.state !== 'open') continue;
    const { id } = issue.milestone;
    if (milestones[id] === undefined) {
      milestones[id] = createMilestone(issue.milestone);
    }
    milestones[id].issues.push(issue);
  }
  return milestones;
}
function createMilestone(info) {
  return {
    ...info,
    issues: [],
  }
}

// add sizes to milestones according to 'size:...' labels
function addSizes(rawMilestones) {
  const milestones = { ...rawMilestones }
  for (const id in milestones) {
    const milestone = milestones[id];
    milestone.openSize = 0;
    milestone.totalSize = 0;
    for (const issue of milestone.issues) {
      const size = getSize(issue);
      if (size) {
        milestone.totalSize += size;
        const stateLabel = getStateLabel(issue);
        // I consider issues open when they're open and not in the check phase
        if(issue.state === 'open' && stateLabel !== 'Check') {
          milestone.openSize += size;
        }
      }
    }
  }
  return milestones;
}
// retrieve size from issue according to 'size:...' label
function getSize(issue) {
  for (const label of issue.labels) {
    const matches = label.name.match(/size:(\d+)/);
    if(!matches) continue;
    return parseInt(matches[1]);
  }
  return null;
}
const stateLabels = ['Discuss', 'ToDo', 'Doing', 'Check']
function getStateLabel(issue) {
  for (const label of issue.labels) {
    if (stateLabels.includes(label.name)) return label.name;
  }
  return null;
}
