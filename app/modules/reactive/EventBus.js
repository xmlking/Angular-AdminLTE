/*jshint -W064 */ /* global SockJS, Stomp */
/**
 * EventBus is intend to provide unified programing interface
 * to subscribe and emit local and remote events.
 * Bridge local EventBus with Server-side EventBus
 * TODO: implement 'Enterprise Integration Patterns'
 */
import 'sockjs';
import 'stomp';
import {EnumSymbol, Enum} from '../utils/Enum';
import {BackoffStrategy, Retry} from '../resiliency/Retry';

export const EBUS_CONFIG = {
    BASE_URL: 'http://localhost:8080/<YourBaaS>/stomp',
    CONNECTION_OPTIONS: {
        headers: {

        }
    }
};

// enum
export const ReadyState = new Enum({
    CONNECTING: {value: 0, description: 'Connecting'},
    OPEN: {value: 1, description: 'Open'},
    AUTHENTICATED: {value: 2, description: 'Authenticated'},
    CLOSING: {value: 3, description: 'Closing'},
    CLOSED: {value: 4, description: 'Closed'},
    RECONNECT_ABORTED: {value: 5, description: 'Reconnect Aborted'}
});

let user = Symbol('user', true);
let handlers = Symbol('handlers', true);
let subscriptions = Symbol('subscriptions', true);
let cBaseUrl = Symbol('cBaseUrl', true);
let cOptions = Symbol('cOptions', true);
let readyState = Symbol('readyState', true);
let onDisconnectDefaultListener = Symbol('onDisconnect', true);

const retryIntermediateCallback   = (error, remainingTries, delay) => {
    console.error(`Previous error: [${error}]`);
    console.info(`Previous remaining tries: [${remainingTries}]`);
    console.info(`Previous delay: [${delay}s]`);
};

export class EventBus {

	constructor(baseUrl : string = EBUS_CONFIG.BASE_URL, options : Object = EBUS_CONFIG.CONNECTION_OPTIONS) {

        this[cOptions] = options;
        this[readyState] = ReadyState.CLOSED;
        this[cBaseUrl] = baseUrl;
        this.stompClient = undefined;
        this[handlers] = new Map();
        this[subscriptions] = new Map();

        this[onDisconnectDefaultListener] = error => {
            console.error('in onDisconnectDefaultListener. will try in 30sec. Error: ', error);
            setTimeout( () => this.open(true, this[onDisconnectDefaultListener]) , 30000);
        };

    }

    get readyState() {
        return this[readyState];
    }

    getUser() {
        return this[user];
    }

    // 1, 2, 3, 4,...10, 10, 10,...
    @Retry({maxTries: 20, maxDelay: 5, backoffStrategy: BackoffStrategy.INCREMENTAL, intermediate: retryIntermediateCallback})
    open(force = false , onDisconnect: Function = this[onDisconnectDefaultListener]): Promise {

        return new Promise((resolve, reject) => {

            if (force || this[readyState] >= ReadyState.CLOSED) {

                console.log('trying to open STOMP connection...');

                let socket = new SockJS(this[cBaseUrl]);
                this.stompClient = Stomp.over(socket);
                this[readyState] = ReadyState.CONNECTING;

                this.stompClient.connect(
                    this[cOptions].headers,
                    (frame) => {
                        if(frame.headers["user-name"]){
                            this[readyState] = ReadyState.AUTHENTICATED;
                        } else {
                            this[readyState] = ReadyState.OPEN;
                        }
                        this._resubscribe();
                        console.group();
                        console.log('%cConnection Opened Succssfully.', 'background: #222; color: #bada55');
                        console.info(`%cFrame: ${frame}`, 'background: #222; color: #bada55');
                        console.info(`%cConnected username: %c${frame.headers["user-name"]}`, 'background: #222; color: #bada55', 'background: #222; color: #7FFFD4');
                        console.info('Registering onDisconnect listener to monitoring future disconnects.');
                        this[user] = frame.headers["user-name"];
                        this.stompClient.ws.onclose = (error) => {
                            this[readyState] = ReadyState.CLOSED;
                            onDisconnect(error);
                        };
                        console.groupEnd();
                        resolve(frame);
                    },
                    (error) => {
                        this[readyState] = ReadyState.CLOSED;
                        reject(error);
                    });

            } else {
                console.info('EventBus already open');
                resolve();
            }
        });
    }

    close(force = false) {
        return new Promise((resolve, reject) => {
            if (force || this[readyState] < ReadyState.CLOSED) {
                this[readyState] = ReadyState.CLOSING;
                this.stompClient.disconnect( () => {
                    this[readyState] = ReadyState.CLOSED;
                    console.log(`%cSTOMP connection closed`,'background: #222; color: #bada55');
                    resolve('STOMP connection closed');
                });
            }else {
                console.log(`%cSTOMP connection already closed`,'background: #222; color: #bada55');
                resolve('STOMP connection already closed');
            }
        });
    }

    _resubscribe() {
//        for(let [address, callback] of this[handlers]) { //FIXME: bug in traceur
//            this[subscriptions].set(address, this.stompClient.subscribe(address,callback));
//        }
        let myHandlers = this[handlers];
        myHandlers.forEach((callback, address, myHandlers) => {
            this[subscriptions].set(address, this.stompClient.subscribe(address,callback));
        });
    }

    //aliases: on, addListener
    registerHandler(address, callback) {
        this[handlers].set(address,callback);
        //for handlers added after connection is opened
        if((this[readyState] === ReadyState.OPEN || this[readyState] === ReadyState.AUTHENTICATED) && !this[subscriptions].has(address)) {
            this[subscriptions].set(address, this.stompClient.subscribe(address, callback));
        }
    }

    //aliases: off, removeListener
    unregisterHandler(address) {
        this[handlers].delete(address);
        if(this[subscriptions].has(address)) {
            this[subscriptions].get(address).unsubscribe();
            this[subscriptions].delete(address);
        }
    }

    //RPC
    send(address, data, headers = {}) {
        return new Promise((resolve, reject) => {
            let subscription = this.stompClient.subscribe(address, (result) => {
                if (result.body) {
                    resolve(JSON.parse(result.body));
                } else {
                    reject({error: 'got empty message'})
                }
                //subscription.unsubscribe();
            });
        })
    }

    //aliases: emit
    publish(address, data, headers = {}) {
        this.stompClient.send(address, headers, JSON.stringify(data));
    }


}
