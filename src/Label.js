import React, { PropTypes } from 'react';
import Color from 'color';

export default function Label({
  data: {
    color,
    name,
    url
  }
}) {
  const textColor = getTextColor(color);
  const style = {
    backgroundColor: `#${color}`
  };
  const linkStyle = {
    color: `#${textColor}`
  };
  const htmlUrl = url.replace('api.github.com/repos','github.com');
  return (
    <div className="label" style={style}>
      <a href={htmlUrl} target="_blank" style={linkStyle}>{name}</a>
    </div>
  );
}

// stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
// https://github.com/qix-/color#luminosity
function getTextColor(bgColorRaw) {
  const bgColor = Color(`#${bgColorRaw}`);
  return bgColor.luminosity() > 0.45 ? '333' : 'fff';
}
