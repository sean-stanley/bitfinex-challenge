/*
 *
 * Trades reducer
 *
 */
import produce from 'immer';
import { ADD_TRADE, SET_DATA, SET_INFO, SET_SUBSCRIBED } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const tradesReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case ADD_TRADE:
        // ASSUMPTION: Webhook provides trades in order of time stamp
        draft.data.unshift(payload);
        // keep array the same length;
        draft.data.pop();
        break;
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

export default tradesReducer;
