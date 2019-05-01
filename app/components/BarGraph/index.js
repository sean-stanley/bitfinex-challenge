/**
 *
 * BarGraph
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function BarGraph({
  data,
  getValue,
  color = 'green',
  width = 500,
  height = 500,
}) {
  const max = data.reduce((acc, d) => Math.max(getValue(d), acc), 0);
  const bars = data.map(d => ({
    height: (getValue(d) / max) * 100,
    width: data.length / width,
  }));

  return (
    <div>
      {bars.map((b, idx) => (
        <div
          key={idx}
          style={{ color, width: b.width, height: `${b.height}%` }}
        />
      ))}
    </div>
  );
}

BarGraph.propTypes = {};

export default memo(BarGraph);
