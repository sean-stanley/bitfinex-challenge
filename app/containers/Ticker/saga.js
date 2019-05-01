import { fork, takeEvery, take, call, put } from 'redux-saga/effects';
import createWatchSocketChannel from 'utils/createWatchSocketChannel';
import messageTransformer from 'utils/messageTransformer';
import {
  INFO_TYPE,
  SUBSCRIBED_TYPE,
  DATA_TYPE,
  EVENT_TYPE,
  HEART_BEAT,
} from 'utils/constants';
import {
  INCOMING_TICKER_PAYLOAD,
  SET_INFO,
  SET_SUBSCRIBED,
  SET_DATA,
} from './constants';

// Individual exports for testing
export default function* tickerSaga() {
  // See example in containers/HomePage/saga.js
  yield fork(watchSocketSaga);
  yield takeEvery(INCOMING_TICKER_PAYLOAD, putMessage);
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
    if (payload[1] !== HEART_BEAT)
      yield put({ payload: payload[1], type: SET_DATA });
  }
}

const tickerMessage = JSON.stringify({
  event: 'subscribe',
  channel: 'ticker',
  symbol: 'tBTCUSD',
});

const watchSocketSaga = createWatchSocketChannel(
  tickerMessage,
  INCOMING_TICKER_PAYLOAD,
  messageTransformer,
);
