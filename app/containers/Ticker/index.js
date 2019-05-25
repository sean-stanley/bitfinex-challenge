/**
 *
 * Ticker
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import NumericLabel from 'react-pretty-numbers';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTicker from './selectors';
import reducer from './reducer';
import saga from './saga';

const Row = styled.div`
  display: flex;
`;

export function Ticker({ ticker: { data } }) {
  useInjectReducer({ key: 'ticker', reducer });
  useInjectSaga({ key: 'ticker', saga });
  console.log('ticker component data', data);

  if (!Array.isArray(data)) return null;

  const dataMap = {
    BID: data[0],
    BID_SIZE: data[1],
    ASK: data[2],
    ASK_SIZE: data[3],
    DAILY_CHANGE: data[4],
    DAILY_CHANGE_PERC: data[5],
    LAST_PRICE: data[6],
    VOLUME: data[7],
    HIGH: data[8],
    LOW: data[9],
  };

  const USDVolume = Math.floor(dataMap.VOLUME * dataMap.BID);
  return (
    <div>
      <Row>
        <h1>BTC/USD</h1>
        <h1>{dataMap.BID}</h1>
      </Row>
      <Row>
        <span>
          Volume <NumericLabel>{USDVolume}</NumericLabel> USD
        </span>
        <span>
          <NumericLabel params={{ precision: 2, justification: 'L' }}>
            {dataMap.DAILY_CHANGE}
          </NumericLabel>{' '}
          (
          <NumericLabel params={{ percentage: true, justification: 'L' }}>
            {dataMap.DAILY_CHANGE_PERC}
          </NumericLabel>
          )
        </span>
      </Row>
      <Row>
        <span>
          LOW <NumericLabel>{dataMap.LOW}</NumericLabel>
        </span>
        <span>
          HIGH <NumericLabel>{dataMap.HIGH}</NumericLabel>
        </span>
      </Row>
    </div>
  );
}

Ticker.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ticker: makeSelectTicker(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Ticker);
