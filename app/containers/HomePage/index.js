/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import styled from 'styled-components';

import 'react-table/react-table.css';

import Ticker from 'containers/Ticker/Loadable';
import Trades from 'containers/Trades/Loadable';
import Books from 'containers/Books/Loadable';

const Row = styled.div`
  display: flex;
  margin-top: 15px;
`;

const Percent66 = styled.div`
  flex-grow: 0.66;
  padding-right: 5px;
`;

export default function HomePage() {
  return (
    <div>
      <Ticker />

      <Row>
        <Percent66>
          <Books />
        </Percent66>
        <Trades />
      </Row>
    </div>
  );
}
