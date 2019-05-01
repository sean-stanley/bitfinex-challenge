/*
 *
 * Books reducer
 *
 */
import produce from 'immer';
import {
  DELETE_DATA,
  UPSERT_DATA,
  SET_DATA,
  SET_INFO,
  SET_SUBSCRIBED,
  SET_PRECISION,
} from './constants';

const calculateTotal = (d, index, array) => {
  const prevIndex = index === 0 ? false : index - 1;
  d.push(d[2] + (prevIndex ? array[prevIndex][3] : 0));
  return d;
};

export const initialState = { precision: 'P0', data: [] };

/* eslint-disable default-case, no-param-reassign */
const booksReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case DELETE_DATA: {
        const price = payload[0];
        const idx = draft.data.findIndex(d => d[0] === price);
        draft.data.splice(idx, 1);
        draft.data = draft.data.map(calculateTotal);
        break;
      }
      case UPSERT_DATA: {
        // search for existing count
        const count = payload[1];
        const idx = draft.data.findIndex(d => d[1] === count);
        if (idx > -1) {
          draft.data[idx] = payload;
        } else {
          draft.data.push(payload);
          // should remove first lowest count too
        }
        draft.data = draft.data.map(calculateTotal);
        break;
      }
      case SET_DATA:
        draft.data = payload.map(calculateTotal);
        break;
      case SET_INFO:
        draft.info = payload;
        break;
      case SET_PRECISION:
        draft.precision = payload;
        break;
      case SET_SUBSCRIBED:
        draft.subscribed = payload;
        break;
    }
  });

export default booksReducer;
