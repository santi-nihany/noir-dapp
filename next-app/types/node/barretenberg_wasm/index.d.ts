/// <reference types="node" resolution-mode="require"/>
import { BarretenbergWasmMain, BarretenbergWasmMainWorker } from './barretenberg_wasm_main/index.js';
export declare class BarretenbergWasm extends BarretenbergWasmMain {
    /**
     * Construct and initialise BarretenbergWasm within a Worker. Return both the worker and the wasm proxy.
     * Used when running in the browser, because we can't block the main thread.
     */
    static new(threads?: number): Promise<{
        worker: import("worker_threads").Worker;
        wasm: BarretenbergWasmMainWorker;
    }>;
}
export type BarretenbergWasmWorker = BarretenbergWasmMainWorker;
//# sourceMappingURL=index.d.ts.map