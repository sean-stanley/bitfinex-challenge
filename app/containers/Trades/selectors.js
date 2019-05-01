import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the trades state domain
 */

const selectTradesDomain = state => state.trades || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Trades
 */

const makeSelectTrades = () =>
  createSelector(
    selectTradesDomain,
    substate => substate,
  );

export default makeSelectTrades;
export { selectTradesDomain };
