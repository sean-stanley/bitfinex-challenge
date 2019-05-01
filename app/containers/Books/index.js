/**
 *
 * Books
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactTable from 'react-table';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import NumericLabel from 'react-pretty-numbers';
import makeSelectBooks from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Books(props) {
  useInjectReducer({ key: 'books', reducer });
  useInjectSaga({ key: 'books', saga, type: RESTART_ON_REMOUNT });

  if (!props.books || !Array.isArray(props.books.data)) return null;

  const { asks, bids } = props.books;

  const columns = [
    { Header: 'Count', id: 'count', accessor: d => d[1] },
    {
      Header: 'Amount',
      id: 'amount',
      accessor: d => <NumericLabel>{d[2]}</NumericLabel>,
    },
    {
      Header: 'Total',
      id: 'total',
      accessor: d => <NumericLabel>{d[3]}</NumericLabel>,
    },
    {
      Header: 'Price',
      id: 'price',
      accessor: d => <NumericLabel>{d[0]}</NumericLabel>,
    },
  ];

  const tableProps = {
    defaultPageSize: 25,
    showPageSizeOptions: false,
    showPaginationBottom: false,
    sortable: false,
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <span>ORDER BOOK</span>
          <span>BTC/USD</span>
        </div>

        <div>
          <span>+</span>
          <span>-</span>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {Array.isArray(asks) && (
          <ReactTable data={bids} {...tableProps} columns={columns} />
        )}
        {Array.isArray(asks) && (
          <ReactTable
            data={asks}
            {...tableProps}
            columns={[...columns].reverse()}
          />
        )}
      </div>
    </div>
  );
}

Books.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  books: makeSelectBooks(),
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
)(Books);
