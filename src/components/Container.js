import { Container as GridContainer } from 'react-grid-system';
import React from 'react';

import View from './View';

export default function Container(props) {
  const { children, style = {} } = props;

  return (
    <div style={{ ...style }}>
      <GridContainer>
        <View>{children}</View>
      </GridContainer>
    </div>
  );
}
