"use client";
import { useRef } from "react";

export default function Home() {
  const inputAge = useRef<HTMLInputElement>(null);
  const inputBirthYear = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const age = inputAge.current?.value;
    if (!age) {
      return alert("Please enter your age");
    } else {
      if (parseInt(age) < 18) {
        alert("You are not old enough to enter this site");
      } else {
        alert("Welcome!");
      }
    }
  };

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
