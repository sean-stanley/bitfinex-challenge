import { fork, takeEvery, call, put, select } from 'redux-saga/effects';
import createWatchSocketChannel from 'utils/createWatchSocketChannel';
import messageTransformer from 'utils/messageTransformer';
import {
  INFO_TYPE,
  SUBSCRIBED_TYPE,
  DATA_TYPE,
  EVENT_TYPE,
  // HEART_BEAT,
} from 'utils/constants';
import {
  INCOMING_BOOKS_PAYLOAD,
  SET_INFO,
  SET_SUBSCRIBED,
  SET_DATA,
  UPSERT_DATA,
  DELETE_DATA,
} from './constants';

export default function* booksSaga() {
  yield fork(watchSocketSaga);
  yield takeEvery(INCOMING_BOOKS_PAYLOAD, putMessage);
}

export function* putMessage({ payload: { event, type, data: payload } }) {
  if (type === EVENT_TYPE) {
    if (event === INFO_TYPE) {
      yield put({ payload, type: SET_INFO });
    }
    if (event === SUBSCRIBED_TYPE) {
      yield put({ payload, type: SET_SUBSCRIBED });
    }
  }
  if (type === DATA_TYPE) {
    if (Array.isArray(payload[1])) {
      if (Array.isArray(payload[1][0])) {
        yield put({ payload: payload[1], type: SET_DATA });
      }
      if (typeof payload[1][0] === 'number') {
        const update = payload[1];
        const count = update[1];
        if (count === 0) {
          yield put({ payload: update, type: DELETE_DATA });
        } else {
          yield put({ payload: update, type: UPSERT_DATA });
        }
      }
    }
  }
}

const booksMessage = JSON.stringify({
  event: 'subscribe',
  channel: 'book',
  symbol: 'tBTCUSD',
  prec: 'P4',
  freq: 'F1',
  len: 25,
  // prec: precision to be added from state
});

const watchSocketSaga = createWatchSocketChannel(
  booksMessage,
  INCOMING_BOOKS_PAYLOAD,
  messageTransformer,
);
