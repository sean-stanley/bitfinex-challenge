/**
 *
 * Asynchronously loads the component for Ticker
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
