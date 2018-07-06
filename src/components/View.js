import React from 'react';

export default function View(props) {
  const { children, style = {}, ...otherProps } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
}
