/**
 * Builds a web worker out of the function
 *
 * @param {Function} fn the function to run with web worker
 * @param {Array.<String>} deps array of strings, imported into the worker through "importScripts"
 *
 * @returns {String} a blob url, containing the code of "fn" as a string
 *
 * @example
 * createWorkerBlobUrl((a,b) => a+b, [])
 * // return "onmessage=return Promise.resolve((a,b) => a + b)
 * .then(postMessage(['IDLE', result]))
 * .catch(postMessage(['ERROR', error])"
 */
export declare const createPersistentBlobUrl: (fn: (args: any[]) => any, deps: string[]) => string;
