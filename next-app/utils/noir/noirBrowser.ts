// TODO use the JSON directly for now
// import { compile } from '@noir-lang/noir_wasm';
import { decompressSync } from 'fflate';
import {
  Crs,
  Barretenberg,
  RawBuffer,
  // @ts-ignore
} from '@aztec/bb.js';
import { ethers } from 'ethers';
import initACVM, { executeCircuit, compressWitness } from '@noir-lang/acvm_js';
import { Fr, Ptr } from '@/types/node/types'; // should be: '@aztec/bb.js/dest/node/types'
import circuit from '../../../noir-app/circuits/target/ageVerifier.json';

export class NoirBrowser {
  acir: string = '';
  acirBuffer: Uint8Array = Uint8Array.from([]);
  acirBufferUncompressed: Uint8Array = Uint8Array.from([]);

  api = {} as Barretenberg;
  acirComposer = {} as Ptr ;

  async init() {
    await initACVM();
    
    this.acirBuffer = Buffer.from(circuit.bytecode, 'base64');
    this.acirBufferUncompressed = decompressSync(this.acirBuffer);

    this.api = await Barretenberg.new(4);
    console.log('acirBuffer: ', this.acirBuffer);
    console.log('acirBufferUncompressed: ', this.acirBufferUncompressed);
    const [exact, total, subgroup] = await this.api.acirGetCircuitSizes(
      this.acirBufferUncompressed,
    );
    
    const subgroupSize = Math.pow(2, Math.ceil(Math.log2(total)));
    const crs = await Crs.new(subgroupSize + 1);
    
    await this.api.commonInitSlabAllocator(subgroupSize);
    await this.api.srsInitSrs(
      new RawBuffer(crs.getG1Data()),
      crs.numPoints,
      new RawBuffer(crs.getG2Data()),
    );
    
    this.acirComposer = await this.api.acirNewAcirComposer(subgroupSize);
  }


  async generateBirthYearHash(year: any): Promise<string>{
    const apiPed = await Barretenberg.new(1);
    try {
      await apiPed.pedersenHashInit();
      // Convert the input value 1998 to a field
      const inputValue = new Fr(BigInt(year));

      // Calculate the Pedersen hash
      const result = await apiPed.pedersenPlookupCompress([inputValue]);
      console.log('hashed result: ',result.toString());
      
      return result.toString()

    } catch (error) {
      console.error('Error:', error);
    }
    return ''
  }

  async generateWitness(input: any): Promise<Uint8Array> {
    const initialWitness = new Map<number, string>();
    const birthYearHash = await this.generateBirthYearHash(input.birthYear)
    initialWitness.set(1, ethers.utils.hexZeroPad(`0x${input.age.toString(16)}`, 32));
    initialWitness.set(2, ethers.utils.hexZeroPad(`0x${input.birthYear.toString(16)}`, 32));
    initialWitness.set(3, birthYearHash);
    console.log(input);
    
    console.log('initial witness: ',initialWitness.values());
    console.log('acirBuffer: ', this.acirBuffer.toString());
    
    const witnessMap = await executeCircuit(this.acirBuffer, initialWitness, () => {
      throw Error('unexpected oracle');
    });

    const witnessBuff = compressWitness(witnessMap);
    return witnessBuff;
  }

  async generateProof(witness: Uint8Array) {
    const proof = await this.api.acirCreateProof(
      this.acirComposer,
      this.acirBufferUncompressed,
      decompressSync(witness),
      false,
    );
    return proof;
  }

  async verifyProof(proof: Uint8Array) {
    await this.api.acirInitProvingKey(this.acirComposer, this.acirBufferUncompressed);
    const verified = await this.api.acirVerifyProof(this.acirComposer, proof, false);
    return verified;
  }

  async destroy() {
    await this.api.destroy();
  }
}
