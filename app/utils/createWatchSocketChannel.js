import { take, call, put } from 'redux-saga/effects';
import createWS from 'utils/socketConnection';
import createSocketChannel from 'utils/createSocketChannel';

const defaultMessageTransformer = data => data;

export default function createWatchSocketChannel(
  subscribeMessage,
  actionType,
  messageTransformer = defaultMessageTransformer,
) {
  return function* watchSocketChannel() {
    const ws = yield call(createWS);
    const socketChannel = yield call(
      createSocketChannel,
      ws,
      subscribeMessage,
      messageTransformer,
    );

    while (true) {
      try {
        // An error from socketChannel will cause the saga jump to the catch block
        const payload = yield take(socketChannel);
        console.log(payload);
        yield put({ type: actionType, payload });
      } catch (err) {
        console.error('web socket error:', err);
        // socketChannel is still open in catch block
        // if we want end the socketChannel, we need close it explicitly
        socketChannel.close();
      }
    }
  };
}
