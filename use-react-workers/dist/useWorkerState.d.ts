import { Controller } from './useWorkerFunc.ts';
export type UseWorkerState = <R extends ReturnType<T>, T extends (args: any) => any = (args: any) => any>(func: T, defaultState: R) => [ReturnType<T> | null, (...args: Parameters<T>) => Promise<void>, Controller];
export declare const useWorkerState: UseWorkerState;
