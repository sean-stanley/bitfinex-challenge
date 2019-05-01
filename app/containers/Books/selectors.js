import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the books state domain
 */

const selectBooksDomain = state => state.books || initialState;

/**
 * Other specific selectors
 */

function getBidsAndAsks(state) {
  if (!state.books) return {};
  const bids = state.books.data.filter(b => b[2] > 0);
  const asks = state.books.data.filter(b => b[2] < 0);
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
