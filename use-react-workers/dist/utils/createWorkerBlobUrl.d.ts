import { TRANSFERABLE_TYPE } from 'use-react-workers/src/types.ts';
declare const createWorkerBlobUrl: (fn: (args: any[]) => any, deps: string[], transferable: TRANSFERABLE_TYPE) => string;
export default createWorkerBlobUrl;
interface JobRunnerOptions {
    fn: Function;
    transferable: TRANSFERABLE_TYPE;
}
export declare const jobRunner: (options: JobRunnerOptions) => (e: MessageEvent) => Promise<void>;
