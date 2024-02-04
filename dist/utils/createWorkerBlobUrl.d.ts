import { TRANSFERABLE_TYPE } from 'use-react-workers/src/types.ts';
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
declare const createWorkerBlobUrl: (fn: (args: any[]) => any, deps: string[], transferable: TRANSFERABLE_TYPE) => string;
export default createWorkerBlobUrl;
interface JobRunnerOptions {
    fn: Function;
    transferable: TRANSFERABLE_TYPE;
}
/**
 * Accepts "userFunc" as a parameter and returns an anonymous function.
 * This anonymous function, accepts as arguments, the parameters to pass to
 * the function "useArgs" and returns a Promise
 *
 * Can be used as a wrapper only inside a Worker
 * because it depends by "postMessage".
 *
 * @param {Function} userFunc {Function} fn the function to run with web worker
 *
 * @returns {Function} returns a function that accepts the parameters
 * to be passed to the "userFunc" function
 */
export declare const jobRunner: (options: JobRunnerOptions) => (e: MessageEvent) => Promise<void>;
