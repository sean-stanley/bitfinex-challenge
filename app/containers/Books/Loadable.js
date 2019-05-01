/**
 *
 * Asynchronously loads the component for Books
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
