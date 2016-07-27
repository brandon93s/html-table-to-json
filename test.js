'use strict';

import test from 'ava';
import sut from './';

/* Input Validation */
function typeThrows(t, input) {
  t.throws(() => sut(input));
}
typeThrows.title = (providedTitle, input) => `${typeof input} throws`;

test(typeThrows, {});
test(typeThrows, []);
test(typeThrows, 1);
test(typeThrows, NaN);
test(typeThrows, true);
