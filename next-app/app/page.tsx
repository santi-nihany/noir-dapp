"use client";
import { useRef, useState, useEffect } from "react";
import Ethers from '../utils/ethers';
import React from 'react';
import { NoirBrowser } from '../utils/noir/noirBrowser';
import toast from 'react-hot-toast';
import { myFunction } from '../utils/testPedersen'

export default function Home() {
  const inputAge = useRef<HTMLInputElement>(null);
  const inputBirthYear = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState({ age: 0, birthYear: 0 });
  const [pending, setPending] = useState(false);
  const [proof, setProof] = useState(Uint8Array.from([]));
  const [verification, setVerification] = useState(false);
  const [noir, setNoir] = useState(new NoirBrowser());

  // Calculates proof
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setInput({age: parseInt(inputAge.current?.value || "0"), birthYear: parseInt(inputBirthYear.current?.value || "0")})  
    console.log(input);
    // try {
    //   const witness = await noir.generateWitness(input);
    //   const proof = await noir.generateProof(witness);
    //   setProof(proof);
    // } catch (err) {
    //   console.log(err);
    //   toast.error('Error generating proof');
    // }
    await myFunction();
  };

  const verifyProof = async () => {
    // only launch if we do have an acir and a proof to verify
    if (proof) {
      try {
        const verification = await noir.verifyProof(proof);
        setVerification(verification);
        toast.success('Proof verified!');

        const ethers = new Ethers();
        const publicInputs = proof.slice(0, 32);
        const slicedProof = proof.slice(32);

        const ver = await ethers.contract.verify(slicedProof, [publicInputs]);
        if (ver) {
          toast.success('Proof verified on-chain!');
          setVerification(true);
        } else {
          toast.error('Proof failed on-chain verification');
          setVerification(false);
        }
      } catch (err) {
        toast.error('Error verifying your proof');
      } finally {
        noir.destroy();
      }
    }
  };

  // Verifier the proof if there's one in state
  // useEffect(() => {
  //   if (proof.length > 0) {
  //     verifyProof();
  //   }
  // }, [proof]);

  // const initNoir = async () => {
  //   setPending(true);

  //   await noir.init();
  //   setNoir(noir);

  //   setPending(false);
  // };

  // useEffect(() => {
  //   initNoir();
  // }, [proof]);

  return (
    <div>
      <header className="flex flex-col text-center w-full mt-10 mb-10">
        <h1 className="text-5xl text-white pb-3">ZK Age Verifier</h1>
        <h2 className="text-md text-white">
          Provide us your age to be accepted in our platform
        </h2>
      </header>
      <main className="flex justify-center w-full">
        <form onSubmit={handleSubmit}>
          <input
            min={0}
            type="number"
            placeholder="Age"
            className="rounded-xl border p-2 mr-2"
            ref={inputAge}
          />
          <input
            min={0}
            type="number"
            placeholder="Birth Year"
            className="rounded-xl border p-2 mr-2"
            ref={inputBirthYear}
          />
          <button
            type="submit"
            className="border rounded-xl bg-slate text-white p-2 px-5"
          >
            Send proof
          </button>
        </form>
      </main>
    </div>
  );
}
