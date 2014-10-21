/**
 * TODO
 * REST Client for Streaming / Chunked  API
 * similar to Restangular but instead of returning Promise, it will return Observable/Stream
 */
/*jshint -W064 */
export const EVENT_STREAM_CONFIG = {
  BASE_URL: 'http://localhost:8080/<YourBaaS>/chunked',
  CONNECTION_OPTIONS: {
    headers: {

    }
  }
};

let cBaseUrl = Symbol('cBaseUrl', true);
let cOptions = Symbol('cOptions', true);

export class EventStream {
  constructor(baseUrl : string = EVENT_STREAM_CONFIG.BASE_URL, options : Object = EVENT_STREAM_CONFIG.CONNECTION_OPTIONS) {

    this[cBaseUrl] = baseUrl;
    this[cOptions] = options;

  }
}
