// A bunch of helper functions.

'use strict';
/**
 * create  DocumentFragment from templateString.
 * TODO Check support using : var supportsDOMRanges = document.implementation.hasFeature("Range", "2.0");
 * @param templateString
 * @returns {DocumentFragment}
 */
function loadDOMFromString(templateString) {
	//FIXME: cache importedDoc
	let range = document.createRange();
	range.selectNode(document.body); // selectNodeContents(document.documentElement) ?
	let importedDoc = range.createContextualFragment(templateString);
	range.detach();
	return importedDoc;
}

/**
 * alternative to loadDOMFromString function.
 * ref: http://ejohn.org/blog/dom-documentfragments/
 * @param templateString
 * @returns {DocumentFragment}
 */
function loadDOMFromString1(templateString) {
	//FIXME: cache importedDoc
	var importedDoc = document.createDocumentFragment();
	var temp = document.createElement('div');
	temp.innerHTML = templateString;
	while (temp.firstChild) {
		importedDoc.appendChild(temp.firstChild);
	}
	return importedDoc;
}

/**
 * create Promise of DocumentFragment from url via link.import
 * @param url
 * @returns {Promise}
 */
function loadDOMFromLink(url) {
	return new Promise((resolve, reject) => {

		var link = document.querySelector('link[rel=import][href$="' + url + '"]');
		if(link) {
			if(link.import){
				resolve(link.import);
			} else {
				console.debug('link not loaded yet: ',link, 'onload' in link);
				setTimeout( () => { resolve(link.import); }, 50);
			}
		}
		else {
			link = document.createElement('link');
			link.rel = 'import';
			link.onload = (e) => {
				console.debug('Loaded import: ' + e.target.href);
				resolve(e.target.import);
			};
			link.onerror = (e) => {
				reject('Error loading import: ' + e.target.href);
			};
			link.href = url;
			document.head.appendChild(link);
		}
	});
}

// https://github.com/jquery/jquery/blob/master/src/serialize.js#L45
function serialize(data) {

    // If this is not an object, defer to native stringification.
    if ( ! angular.isObject( data ) ) {
        return( ( data === null ) ? '' : data.toString() );
    }
    var buffer = [];
    // Serialize each key in the object.
    for ( var name in data ) {

        if ( ! data.hasOwnProperty( name ) ) {
            continue;
        }
        var value = data[ name ];
        buffer.push( encodeURIComponent( name ) + '=' + encodeURIComponent( ( value === null ) ? '' : value ));
    }
    // Serialize the buffer and clean it up for transportation.
    var source = buffer
        .join( '&' )
        .replace( /%20/g, '+' );

    return( source );
}

function isProxySupported() {
  try {
    return typeof Proxy !== 'undefined' &&
      new Proxy({}, { get: function () { return 5; } }).foo === 5;
  }
  catch(err) { }
  return false;
}

export {
  isProxySupported,
	loadDOMFromString,
	loadDOMFromString1,
	loadDOMFromLink,
    serialize
};
