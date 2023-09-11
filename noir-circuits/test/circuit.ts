import {
  create_proof,
  setup_generic_prover_and_verifier,
  verify_proof,
} from '@noir-lang/barretenberg/dest/client_proofs';
import { BarretenbergWasm } from '@noir-lang/barretenberg/dest/wasm';
import { SinglePedersen } from '@noir-lang/barretenberg/dest/crypto';
import { compile } from '@noir-lang/noir_wasm';
import { expect } from 'chai';
import { resolve } from 'path';
import { numToHex } from '../utils/index';

describe('Test Age Verification', async () => {
    let barretenberg;
    let pedersen;
    const VALID_YEAR = 1998;
    const VALID_AGE = 25;
    const INVALID_YEAR = 1988;
    const INVALID_AGE = 35;



    before(async () => {
        barretenberg = await BarretenbergWasm.new();
        pedersen = new SinglePedersen(barretenberg);
    })

    it('should throw error with invalid age', async () => {
        const yearBuffer = pedersen.compressInputs([Buffer.from(numToHex(VALID_YEAR), 'hex')])
        const abi = {
            age: INVALID_AGE,
            birth_year: VALID_YEAR,
            hash: `0x${yearBuffer.toString('hex')}`
        }
        console.log(abi);
    });

    // it('should throw error with invalid birth year', async () => {
    //     const abi 
    // });
});