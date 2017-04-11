const fetch = require('node-fetch');
const express = require('express');
const path = require('path');
const btoa = require('btoa');
const logger = require('morgan');

const { ISSUES_OWNER, ISSUES_REPO, GITHUB_USER, GITHUB_TOKEN } = process.env;

const PER_PAGE = 100; // max of github api is 100

const BASE_URL = `https://api.github.com/repos/${ISSUES_OWNER}/${ISSUES_REPO}/issues`;

// const BASE_QUERY = `per_page=${PER_PAGE}&sort=updated&direction=asc`;
const BASE_QUERY = `per_page=${PER_PAGE}&sort=created&direction=desc`;

const app = express();

// check NODE_ENV environment variable
console.log('env: ', app.get('env'));
const devMode = app.get('env') === 'development';
if(devMode) app.use(logger('dev'));

const rootFolder = path.join(__dirname, '..', devMode ? '.' : 'dist');
console.log('rootFolder: ', rootFolder);
app.use(express.static(rootFolder));

// Have all /data routes return attempt to load Kickstarter project data
app.get('/data/issues.:ext', (req, res) => {
  console.log('issues request');
  const { ext } = req.params;
  if (ext !== 'json') {
    return res.status(404).send('Only supports json format requests');
  }
  const { state } = req.query;

  loadAllIssues(state).then(data => {
    console.log('total results: ', data.length);
    return res.json(data);
  }).catch(err => {
    console.log('err: ', err);
    return res.status(500).send(err.message)
  });
});

// Using github API v3 to retrieve issues
// https://developer.github.com/v3/issues/
function loadAllIssues(state) {
  console.log('loadAllIssues state: ', state);
  return new Promise((resolve, reject) => {
    let allIssues = [];
    function loadPage(page) {
      console.log('load page ', page);
      const stateQuery = `&state=${state? state : 'all'}`;
      const url = `${BASE_URL}?${BASE_QUERY}&page=${page}${stateQuery}`;
      console.log('  requesting issues using url: ', url);
      const  headers = {};
      if (GITHUB_USER) {
        headers.Authorization = `Basic ${btoa(`${GITHUB_USER}:${GITHUB_TOKEN}`)}`;
      }
      return fetch(url,{ headers })
      .then(response => response.json())
      .then(data => {
        if (!(data instanceof Array)) {
          console.log('invalid data: ', data);
          return reject(data);
        }
        allIssues = allIssues.concat(data);
        if(data.length === PER_PAGE) return loadPage(page+1);
        else resolve(allIssues);
      })
      .catch(reject);
    }
    loadPage(1);
  });
}

// Have all other routes return regular front end
const indexPath = path.join(rootFolder, 'index.html');
app.get('/*', (req, res) => {
  res.sendFile(indexPath);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on ', listener.address().port);
});
