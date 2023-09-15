import {
  Crs,
  Barretenberg,
  RawBuffer,
  // @ts-ignore
} from '@aztec/bb.js';

import { Fr } from '@/types/node/types';
import { ethers } from 'ethers';


export const myFunction = async ()=> {
    
    const api = await Barretenberg.new(1);
    
    await api.pedersenHashInit();
    try {
      // Convert the input value 1998 to a field
      const inputValue = new Fr(BigInt('1998'));

      // Calculate the Pedersen hash
      const result = await api.pedersenPlookupCompress([inputValue]);

      const expectedOutput = '0x1bbeb13ec87a172551c79252551df87bf1e0445d51de912fc00a1d7e330c5d6b';

      // Compare the result to the expected output
      console.log('Expected output: ',expectedOutput);
      console.log('Obtained output: ',result.toString());

    } catch (error) {
      console.error('Error:', error);
    } finally {
      await api.destroy();
    }
}