/**
 *
 * Asynchronously loads the component for Trades
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
