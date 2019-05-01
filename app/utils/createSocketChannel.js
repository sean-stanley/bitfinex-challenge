import { eventChannel } from 'redux-saga';

const CLIENT_CLOSED = 1001;

// referenced from https://redux-saga.js.org/docs/advanced/Channels.html
// this function creates an event channel from a given socket
// Setup subscription to incoming `Ticker` events
export default function createSocketChannel(
  socket,
  subscribeMessage,
  messageTransformer,
) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  const ws = socket;
  return eventChannel(emit => {
    const messageHandler = event => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(messageTransformer(event.data));
    };

    const errorHandler = errorEvent => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason));
    };

    ws.onopen = () => ws.send(subscribeMessage);

    // setup the subscription
    ws.onmessage = messageHandler;
    ws.onerror = errorHandler;

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      ws.close(CLIENT_CLOSED, 'event channel closing');
    };

    return unsubscribe;
  });
}
