import { Options, WorkerStatus } from './types.ts';
/**
 * I might be able to wrap this with the `useWorker` and reduce the overall
 * size of the library
 * ---
 * At the bare minimum, there is some repeated logic in here that could probably
 * make separate modules.
 */
export interface Controller {
    status: WorkerStatus;
    terminate: () => void;
}
export type UseWorkerFunc = <T extends (...funcArgs: any[]) => any>(func: T, options?: Options) => [(...funcArgs: Parameters<T>) => Promise<ReturnType<T>>, Controller];
/**
 * @param {Function} func the function to run with web worker
 * @param {Options} options useWorkerFunc option params
 */
export declare const useWorkerFunc: UseWorkerFunc;
