"use client";

import axios from "axios";
import { useRef } from "react";
import { useRouter}  from 'next/navigation'
export default function Signup() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSignin = async () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      await axios.post("http://localhost:3000/api/signin", { username, password });
      router.push('/user')
    } catch (error) {
      console.error("Signin failed:", error);
      
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="p-5 border border-white text-center rounded-md">
        <h1 className="text-3xl my-3 font-bold">Sign In</h1>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="username"
            ref={usernameRef}
            className="px-3 py-1 rounded-md"
          />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            className="px-3 py-1 rounded-md"
          />
        </div>

        <button
          className="my-3 bg-white text-black px-3 py-1 rounded-md"
          onClick={handleSignin}
        >
          Sign In 
        </button>
      </div>
    </div>
  );
}
