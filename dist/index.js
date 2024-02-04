import { useState, useRef, useCallback, useEffect, useMemo } from "react";
const importScriptsFromDeps = (deps) => {
  if (deps.length === 0)
    return "";
  const depsString = deps.map((dep) => `'${dep}'`).toString();
  return `importScripts(${depsString})`;
};
const createWorkerBlobUrl = (fn, deps, transferable) => {
  const blobCode = `
    ${importScriptsFromDeps(deps)};
    onmessage=(${jobRunner$1})({
      fn: ${fn},
      transferable: '${transferable}'
    })
  `;
  const blob = new Blob([blobCode], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  return url;
};
const jobRunner$1 = (options) => async (e) => {
  const [userFuncArgs] = e.data;
  try {
    const result = await Promise.resolve(options.fn(...userFuncArgs));
    const isTransferable = (val_1) => "ArrayBuffer" in self && val_1 instanceof ArrayBuffer || "MessagePort" in self && val_1 instanceof MessagePort || "ImageBitmap" in self && val_1 instanceof ImageBitmap || "OffscreenCanvas" in self && val_1 instanceof OffscreenCanvas;
    const transferList = options.transferable === "auto" && isTransferable(result) ? [result] : [];
    postMessage(["idle", result], transferList);
  } catch (error) {
    postMessage(["error", error]);
  }
};
var WorkerStatus = /* @__PURE__ */ ((WorkerStatus2) => {
  WorkerStatus2["IDLE"] = "idle";
  WorkerStatus2["RUNNING"] = "running";
  WorkerStatus2["ERROR"] = "error";
  WorkerStatus2["EXPIRED"] = "expired";
  WorkerStatus2["KILLED"] = "killed";
  return WorkerStatus2;
})(WorkerStatus || {});
var TRANSFERABLE_TYPE = /* @__PURE__ */ ((TRANSFERABLE_TYPE2) => {
  TRANSFERABLE_TYPE2["AUTO"] = "auto";
  TRANSFERABLE_TYPE2["NONE"] = "none";
  return TRANSFERABLE_TYPE2;
})(TRANSFERABLE_TYPE || {});
const defaultOptions$1 = {
  timeout: void 0,
  remoteDependencies: [],
  autoTerminate: true,
  transferable: TRANSFERABLE_TYPE.AUTO
};
const defaultPromise = {
  resolve: () => null,
  reject: () => null
};
const useWorkerFunc = (func, options = defaultOptions$1) => {
  const { autoTerminate, transferable, remoteDependencies, timeout } = {
    ...defaultOptions$1,
    ...options
  };
  const [workerStatus, setWorkerStatus] = useState(WorkerStatus.IDLE);
  const worker = useRef();
  const promise = useRef(defaultPromise);
  const timeoutId = useRef();
  const killWorker = useCallback(() => {
    var _a;
    if ((_a = worker.current) == null ? void 0 : _a._url) {
      worker.current.terminate();
      URL.revokeObjectURL(worker.current._url);
      promise.current = defaultPromise;
      worker.current = void 0;
      clearTimeout(timeoutId.current);
    }
  }, []);
  const onWorkerEnd = useCallback(
    (status) => {
      if (autoTerminate) {
        killWorker();
      }
      setWorkerStatus(status);
    },
    [autoTerminate, killWorker, setWorkerStatus]
  );
  const generateWorker = useCallback(() => {
    const workerUrl = createWorkerBlobUrl(func, remoteDependencies, transferable);
    const webWorker = new Worker(workerUrl);
    webWorker._url = workerUrl;
    webWorker.onmessage = (e) => {
      const [status, result] = e.data;
      switch (status) {
        case WorkerStatus.IDLE:
          promise.current.resolve(result);
          onWorkerEnd(WorkerStatus.IDLE);
          break;
        default:
          promise.current.reject(result);
          onWorkerEnd(WorkerStatus.ERROR);
          break;
      }
    };
    webWorker.onerror = (e) => {
      promise.current.reject(e);
      onWorkerEnd(WorkerStatus.ERROR);
    };
    if (timeout) {
      timeoutId.current = setTimeout(() => {
        killWorker();
        setWorkerStatus(WorkerStatus.EXPIRED);
      }, timeout);
    }
    return webWorker;
  }, [func, options, killWorker]);
  const callWorker = useCallback(
    (...workerArgs) => {
      return new Promise((resolve, reject) => {
        var _a;
        promise.current = {
          resolve,
          reject
        };
        const transferList = transferable === TRANSFERABLE_TYPE.AUTO ? workerArgs.filter(
          (val) => "ArrayBuffer" in window && val instanceof ArrayBuffer || "MessagePort" in window && val instanceof MessagePort || "ImageBitmap" in window && val instanceof ImageBitmap || "OffscreenCanvas" in window && val instanceof OffscreenCanvas
        ) : [];
        (_a = worker.current) == null ? void 0 : _a.postMessage([[...workerArgs]], transferList);
        setWorkerStatus(WorkerStatus.RUNNING);
      });
    },
    [transferable]
  );
  const workerHook = useCallback(
    (...funcArgs) => {
      try {
        if (workerStatus === WorkerStatus.RUNNING) {
          throw new Error(
            "[useWorkerFunc] You can only run one instance of the worker at a time, if you want to run more than one in parallel, create another instance with the hook useWorkerFunc(). Read more: https://github.com/jpwallace22/use-react-workers"
          );
        }
        if (autoTerminate || !worker.current) {
          worker.current = generateWorker();
        }
        return callWorker(...funcArgs);
      } catch (e) {
        console.error(e);
        return Promise.reject(`Web worker "${func.name}" is already running`);
      }
    },
    [workerStatus, autoTerminate, callWorker, generateWorker, func]
  );
  const terminate = useCallback(() => {
    killWorker();
    setWorkerStatus(WorkerStatus.KILLED);
  }, [killWorker, setWorkerStatus]);
  const controller = {
    status: workerStatus,
    terminate
  };
  useEffect(() => {
    killWorker();
  }, [killWorker]);
  return [workerHook, controller];
};
const useWorkerState = (func, defaultState) => {
  const [result, setResult] = useState(defaultState);
  const [workerFunc, controller] = useWorkerFunc(func);
  const setState = async (...args) => {
    const data = await workerFunc(...args);
    setResult(data);
  };
  useEffect(() => {
    return () => controller.terminate();
  }, []);
  return [result, setState, controller];
};
const createPersistentBlobUrl = (fn, deps) => {
  const blobCode = `
    ${importScriptsFromDeps(deps)};
    onmessage=(${jobRunner})({
      fn: ${fn},
    })
  `;
  const blob = new Blob([blobCode], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  return url;
};
const jobRunner = ({ fn }) => async (e) => {
  const [userFuncArgs] = e.data;
  fn(...userFuncArgs);
};
const defaultOptions = {
  timeout: void 0,
  remoteDependencies: [],
  autoTerminate: false,
  transferable: TRANSFERABLE_TYPE.AUTO
};
const useWorker = (func, options = defaultOptions) => {
  const { autoTerminate, transferable, remoteDependencies, timeout } = {
    ...defaultOptions,
    ...options
  };
  const [workerStatus, setWorkerStatus] = useState(WorkerStatus.IDLE);
  const worker = useRef();
  const timeoutId = useRef();
  const killWorker = useCallback(() => {
    var _a;
    if ((_a = worker.current) == null ? void 0 : _a._url) {
      worker.current.terminate();
      URL.revokeObjectURL(worker.current._url);
      worker.current = void 0;
      clearTimeout(timeoutId.current);
    }
  }, []);
  const generateWorker = useCallback(() => {
    const workerUrl = createPersistentBlobUrl(func, remoteDependencies);
    const webWorker = new Worker(workerUrl);
    webWorker._url = workerUrl;
    if (timeout) {
      timeoutId.current = setTimeout(() => {
        killWorker();
        setWorkerStatus(WorkerStatus.EXPIRED);
      }, timeout);
    }
    return webWorker;
  }, [func, options, killWorker]);
  const postMessage2 = useCallback(
    (...funcArgs) => {
      var _a;
      if (!worker.current || workerStatus !== WorkerStatus.RUNNING) {
        worker.current = generateWorker();
        setWorkerStatus(WorkerStatus.RUNNING);
      }
      const transferList = transferable === TRANSFERABLE_TYPE.AUTO ? funcArgs.filter(
        (val) => "ArrayBuffer" in window && val instanceof ArrayBuffer || "MessagePort" in window && val instanceof MessagePort || "ImageBitmap" in window && val instanceof ImageBitmap || "OffscreenCanvas" in window && val instanceof OffscreenCanvas
      ) : [];
      (_a = worker.current) == null ? void 0 : _a.postMessage([[...funcArgs]], transferList);
    },
    [generateWorker, transferable, workerStatus]
  );
  const onMessage = useCallback(
    (callBack) => {
      if (!worker.current)
        return;
      try {
        worker.current.onmessage = (e) => {
          callBack(e);
          if (autoTerminate) {
            killWorker();
            setWorkerStatus(WorkerStatus.IDLE);
          }
        };
      } catch (e) {
        throw new Error(e);
      } finally {
        if (autoTerminate) {
          killWorker();
          setWorkerStatus(WorkerStatus.IDLE);
        }
      }
    },
    [autoTerminate, killWorker]
  );
  const terminate = useCallback(() => {
    killWorker();
    setWorkerStatus(WorkerStatus.KILLED);
  }, [killWorker, setWorkerStatus]);
  const workerHook = useMemo(
    () => ({
      postMessage: postMessage2,
      onMessage,
      terminate,
      status: workerStatus
    }),
    [postMessage2, onMessage, terminate, workerStatus]
  );
  useEffect(() => {
    killWorker();
  }, [killWorker]);
  return workerHook;
};
export {
  TRANSFERABLE_TYPE,
  WorkerStatus,
  useWorker,
  useWorkerFunc,
  useWorkerState
};
