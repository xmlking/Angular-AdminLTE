export class Immutable {
    static proxify(obj) {
        if (!(obj instanceof Object)) {
            throw new Error('no @immutable annotation on constructor');
        }

        return new Proxy(obj, {
            constructor: (target, args) => {
                console.log('in Immutable constructor');
                //Object.freeze(this);
                return Reflect.constructor(target, args);
            }
        });
    }
}