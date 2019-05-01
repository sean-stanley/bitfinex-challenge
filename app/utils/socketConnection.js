import WebSocket from 'isomorphic-ws';

export default function createSocketConnection() {
  return new WebSocket('wss://api-pub.bitfinex.com/ws/2');
}
