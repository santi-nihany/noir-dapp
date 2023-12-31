import { wrap } from 'comlink';
export function getSharedMemoryAvailable() {
    const globalScope = typeof window !== 'undefined' ? window : self;
    return typeof SharedArrayBuffer !== 'undefined' && globalScope.crossOriginIsolated;
}
export function getRemoteBarretenbergWasm(worker) {
    return wrap(worker);
}
export function getNumCpu() {
    return navigator.hardwareConcurrency;
}
export function threadLogger() {
    return undefined;
}
export function killSelf() {
    self.close();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvYmFycmV0ZW5iZXJnX3dhc20vaGVscGVycy9icm93c2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFL0IsTUFBTSxVQUFVLHdCQUF3QjtJQUN0QyxNQUFNLFdBQVcsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xFLE9BQU8sT0FBTyxpQkFBaUIsS0FBSyxXQUFXLElBQUksV0FBVyxDQUFDLG1CQUFtQixDQUFDO0FBQ3JGLENBQUM7QUFFRCxNQUFNLFVBQVUseUJBQXlCLENBQUksTUFBYztJQUN6RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQU0sQ0FBQztBQUMzQixDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVM7SUFDdkIsT0FBTyxTQUFTLENBQUMsbUJBQW1CLENBQUM7QUFDdkMsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZO0lBQzFCLE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRCxNQUFNLFVBQVUsUUFBUTtJQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDZixDQUFDIn0=