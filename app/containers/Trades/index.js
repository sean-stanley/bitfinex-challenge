/**
 *
 * Trades
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactTable from 'react-table';
import moment from 'moment';

import NumericLabel from 'react-pretty-numbers';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectTrades from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Trades({ trades: { data } }) {
  useInjectReducer({ key: 'trades', reducer });
  useInjectSaga({ key: 'trades', saga });

  const tableProps = {
    columns: [
      {
        id: 'bidOrAsk',
        accessor: d => (d[2] > 0 ? 'buy' : 'sell'),
      },
      {
        Header: 'TIME',
        id: 'time',
        accessor: d => moment(d[1], 'x').format('hh:mm:ss'),
      },
      {
        Header: 'PRICE',
        id: 'price',
        accessor: d => <NumericLabel>{d[3]}</NumericLabel>,
      },
      {
        Header: 'AMOUNT',
        id: 'amount',
        accessor: d => <NumericLabel>{d[2]}</NumericLabel>,
      },
    ],
    defaultPageSize: 30,
    showPageSizeOptions: false,
    showPaginationBottom: false,
    sortable: false,
  };

  return (
    <div>
      <div>
        <span>TRADES</span>
        <span>BTC/USD</span>
      </div>
      <ReactTable data={data} {...tableProps} />
    </div>
  );
}

Trades.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  trades: makeSelectTrades(),
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
)(Trades);
