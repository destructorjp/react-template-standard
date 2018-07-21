import React from 'react';

export default function Image({ source, alt = '', style = {}, ...otherProps }) {
  return (
    <img alt={alt} src={source && source.uri} {...style} {...otherProps} />
  );
}
