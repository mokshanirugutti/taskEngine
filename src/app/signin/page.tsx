"use client"
import axios from "axios";
import {  useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/Buttons/LoadingButton";
import { Toaster, toast } from "sonner";
import Link from "next/link";

export default  function Signin() {
  

  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<null | string>(null);

  const handleSignin = async () => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        email,
        password,
      });
      const res = response.data;
      if (res.success) {
        router.push("/user");
      } else {
          
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error?.message)
      setError(error?.message || "Signin failed.");
      
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <div className="p-5 border border-white text-center rounded-md">
      <h1 className="text-3xl my-3 font-bold">Sign In</h1>
  
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="email"
          ref={emailRef}
          className="px-3 py-1 rounded-md"
          required
        />
        <input
          type="password"
          placeholder="password"
          ref={passwordRef}
          className="px-3 py-1 rounded-md"
          required
        />
      </div>
  
      <LoadingButton title="Sign In" onClick={handleSignin} />
      
      <p className="mt-3 ">Create new account? singup <Link href="/signup" className="underline">here</Link></p>
    </div>
    <Toaster richColors/>
  </div>
  );
}