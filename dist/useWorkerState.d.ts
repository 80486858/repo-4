import { Controller } from './useWorkerFunc.ts';
export type UseWorkerState = <R extends ReturnType<T>, T extends (args: any) => any = (args: any) => any>(func: T, defaultState: R) => [ReturnType<T> | null, (...args: Parameters<T>) => Promise<void>, Controller];
/**
 * Executes a function in [useWorkerFunc](./useWorkerFunc) and retrieves its result in React state.
 * @param {T} func - The function to be executed in the web worker.
 * @param {ReturnType<T>} defaultState - The arguments to be passed to the function.
 * @returns {[ReturnType<T> | null, (input: Parameters<T>) => Promise<void>,  Controller]} - An array containing the result of the function and a controller object.
 */
export declare const useWorkerState: UseWorkerState;
