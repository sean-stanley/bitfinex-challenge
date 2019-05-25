import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the books state domain
 */

const selectBooksDomain = state => state.books || initialState;

/**
 * Other specific selectors
 */

const calculateTotal = (d, index, array) => {
  const prevIndex = Math.max(0, index - 1);
  if (index === 0) {
    d[3] = Math.abs(d[2]);
    return d;
  }
  d[3] = Math.abs(d[2]) + array[prevIndex][3];
  return d;
};

function getBidsAndAsks(state) {
  if (!state.books) return {};
  const bids = state.books.data.filter(b => b[2] > 0).map(calculateTotal);
  const asks = state.books.data.filter(b => b[2] < 0).map(calculateTotal);

  return { bids, asks };
}

/**
 * Default selector used by Books
 */

const makeSelectBooks = () =>
  createSelector(
    selectBooksDomain,
    getBidsAndAsks,
    (substate, bidsAndAsks) => ({ ...substate, ...bidsAndAsks }),
  );

export default makeSelectBooks;
export { selectBooksDomain };
