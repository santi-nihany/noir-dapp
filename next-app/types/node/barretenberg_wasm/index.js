import { proxy } from 'comlink';
import createDebug from 'debug';
import { createMainWorker } from './barretenberg_wasm_main/factory/node/index.js';
import { getRemoteBarretenbergWasm } from './helpers/node/index.js';
import { BarretenbergWasmMain } from './barretenberg_wasm_main/index.js';
const debug = createDebug('bb.js:wasm');
export class BarretenbergWasm extends BarretenbergWasmMain {
    /**
     * Construct and initialise BarretenbergWasm within a Worker. Return both the worker and the wasm proxy.
     * Used when running in the browser, because we can't block the main thread.
     */
    static async new(threads) {
        const worker = createMainWorker();
        const wasm = getRemoteBarretenbergWasm(worker);
        await wasm.init(threads, proxy(debug));
        return { worker, wasm };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFdBQVcsTUFBTSxPQUFPLENBQUM7QUFDaEMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDbEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUE4QixNQUFNLG1DQUFtQyxDQUFDO0FBRXJHLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV4QyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsb0JBQW9CO0lBQ3hEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQWdCO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLGdCQUFnQixFQUFFLENBQUM7UUFDbEMsTUFBTSxJQUFJLEdBQUcseUJBQXlCLENBQTZCLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0YifQ==