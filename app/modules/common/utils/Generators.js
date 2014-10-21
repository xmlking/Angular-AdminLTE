'use strict';
/**
 * This module defines several useful generators,
 * not all of which are used in the Todo app.
 */

import {Provide, Inject, TransientScope} from 'di/index';

/* exported entries,keys,take,values,keyGenerator */
export class Generators {
    // A generator for iterating over the key/value pairs in an object.
    static *entries(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }

    // A generator for iterating over the keys in an object.
    static *keys(obj) {
        for (let key of Object.keys(obj)) {
            yield key;
        }
    }

    // A generator that yields the first n values of an iterator.
    static *take(iterator, n) {
        while (n > 0) {
            yield iterator.next();
            n--;
        }
    }

    // A generator for iterating over the values in an object.
    static *values(obj) {
        for (let key of Object.keys(obj)) {
            yield obj[key];
        }
    }

    /**
     * this keyGenerator is used many places to generate keys, so TransientScope.
     * e.g., cache keys, todo_map keys etc.
     */
    @TransientScope
    @Inject
    @Provide('sumoKeyGen')
    static *keyGenerator() {
        for (var i = 1; true; i++) {
            var reset = yield i;
            if (reset) {
                i = 0;
            }
        }
    }

}
