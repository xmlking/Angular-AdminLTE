export class EnumSymbol {
    // constructor(name: string, {value} = {}, value: number) { //FIXME https://github.com/google/traceur-compiler/issues/1197
    // constructor(name: string, {value} : {value: number}) { //traceur recommended, but still not implemented
    constructor(name: string, {value}, value: number) { //workaround with /xmlking/assert
        this.name  = name;

        // this.value = (value === Infinity) ? Symbol(name) : value; //workaround
        this.value = (value !== undefined) ? value: Symbol(name); //workaround with /xmlking/assert //  miss Elvis Operator

        delete arguments[1].value;
        Object.assign(this, arguments[1]);

        Object.freeze(this);
    }

    toString() {
        return this.name;
    }

    valueOf() {
        return this.value;  //TODO Symbol.for Symbol.keyFor
    }
}

export class Enum {
    constructor(enumLiterals) {
        for (let key in enumLiterals) {
            if(!enumLiterals[key]) throw new TypeError('each enum should have been initialized with atleast empty {} value');
            this[key] =  new EnumSymbol(key, enumLiterals[key]);
        }
        Object.freeze(this);
    }

    symbols() {
        return [for (key of Object.keys(this)) this[key] ];
    }

    keys() {
        //return [for (key of Object.keys(this)) key];
        return Object.keys(this);
    }

    contains(sym) {
        if (!sym instanceof EnumSymbol) return false;
        return this[sym.name] === sym;
    }
}
