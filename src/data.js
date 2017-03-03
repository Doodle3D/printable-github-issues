import 'whatwg-fetch';

function loadData() {

  return fetch(`/data/issues.json`)
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

export function getData() {
  return loadData();
}
