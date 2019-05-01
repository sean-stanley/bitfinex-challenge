import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the ticker state domain
 */

const selectTickerDomain = state => state.ticker || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Ticker
 */

const makeSelectTicker = () =>
  createSelector(
    selectTickerDomain,
    substate => substate,
  );

export default makeSelectTicker;
export { selectTickerDomain };
