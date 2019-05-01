import { fork, takeEvery, put } from 'redux-saga/effects';
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
  INCOMING_TRADES_PAYLOAD,
  SET_INFO,
  SET_SUBSCRIBED,
  SET_DATA,
  ADD_TRADE,
} from './constants';

export default function* tradesSaga() {
  yield fork(watchSocket);
  yield takeEvery(INCOMING_TRADES_PAYLOAD, putMessage);
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
    if (typeof payload[1] === 'string' && payload[1] !== HEART_BEAT) {
      // add data as a new trade
      const newTrade = payload[2];
      yield put({ payload: newTrade, type: ADD_TRADE });
    }
    if (Array.isArray(payload[1]))
      yield put({ payload: payload[1], type: SET_DATA });
  }
}

const tradesMessage = JSON.stringify({
  event: 'subscribe',
  channel: 'trades',
  symbol: 'tBTCUSD',
});

const watchSocket = createWatchSocketChannel(
  tradesMessage,
  INCOMING_TRADES_PAYLOAD,
  messageTransformer,
);
