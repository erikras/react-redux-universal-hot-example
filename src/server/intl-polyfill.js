/* global Intl */

// Add support for intl on node.js
// See: http://formatjs.io/guides/runtime-environments/#server

import { locales } from '../config';
import areIntlLocalesSupported from 'intl-locales-supported';

if (!global.Intl || !areIntlLocalesSupported(locales)) {
  require('intl');
}
