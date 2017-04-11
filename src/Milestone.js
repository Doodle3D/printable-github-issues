import React, { PropTypes } from 'react';

export default function Milestone({
  data: {
    title,
    url,
    openSize,
    totalSize
  }
}) {
  return (
    <div className="milestone">
      <a href={url} target="_blank">{title}</a>
      : {percComplete(openSize, totalSize)}% {totalSize-openSize} / {totalSize}
    </div>
  );
}

function percComplete(open, total) {
  const complete = 1-open/total;
  return Math.round(complete*100);
}
