import { Options, WorkerStatus } from './types.ts';
export type UseWorker = <T extends (...funcArgs: any[]) => any>(func: T, options?: Options) => {
    postMessage: (...funcArgs: Parameters<T>) => void;
    onMessage: (callBack: (e: MessageEvent) => void) => void;
    terminate: () => void;
    status: WorkerStatus;
};
export declare const useWorker: UseWorker;
