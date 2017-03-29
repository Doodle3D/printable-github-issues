import React, { PropTypes } from 'react';
import Label from './Label.js';
import { STYLES } from './constants.js';

export default function Issue({
  data: {
    labels,
    number,
    title,
    html_url
  },
  style
}) {
  switch(style) {
    case STYLES.PRINT:
      return (
        <div className="issue">
          <div className="number">
            <a href={html_url} target="_blank">#{number}</a>
          </div>
          <div className='column'>
            <div className="title">
              <a href={html_url} target="_blank">{title}</a>
            </div>
            <div className="labels">
              {labels.map(labelData =>
                <Label data={labelData} key={labelData.id}/>
              )}
            </div>
          </div>
        </div>
      );
    case STYLES.MARKDOWN:
      return (
        <div className="issue">
          [#{number}&nbsp;{title}]({html_url})
        </div>
      );
  }
}
