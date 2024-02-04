import { Options, WorkerStatus } from './types.ts';
export interface Controller {
    status: WorkerStatus;
    terminate: () => void;
}
export type UseWorkerFunc = <T extends (...funcArgs: any[]) => any>(func: T, options?: Options) => [(...funcArgs: Parameters<T>) => Promise<ReturnType<T>>, Controller];
export declare const useWorkerFunc: UseWorkerFunc;
