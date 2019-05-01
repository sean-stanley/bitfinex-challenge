/*
 *
 * Ticker reducer
 *
 */
import produce from 'immer';
import { SET_DATA, SET_INFO, SET_SUBSCRIBED } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const tickerReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case SET_DATA:
        draft.data = payload;
        break;
      case SET_INFO:
        draft.info = payload;
        break;
      case SET_SUBSCRIBED:
        draft.subscribed = payload;
        break;
    }
  });

export default tickerReducer;
