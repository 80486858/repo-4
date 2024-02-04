import { Options, WorkerStatus } from './types.ts';
export type UseWorker = <T extends (...funcArgs: any[]) => any>(func: T, options?: Options) => {
    postMessage: (...funcArgs: Parameters<T>) => void;
    onMessage: (callBack: (e: MessageEvent) => void) => void;
    terminate: () => void;
    status: WorkerStatus;
};
/**
 * @param {Function} func the function to run with web worker
 * @param {Options} options useWorkerFunc option params
 */
export declare const useWorker: UseWorker;
