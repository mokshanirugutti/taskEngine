"use client";

import LoadingButton from "@/components/Buttons/LoadingButton";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";


export default function Signup() {
    const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<null | string>(null);


  const handleSignup = async () => {
    // console.log("handleSignup function called");
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    // console.log("called singup")
    try {
      // console.log("before axios post")
      const response = await axios.post("http://localhost:3000/api/signup", { email, password });
//       console.log('Full response:', response);
// console.log('Response Data:', response.data);

      const res = response.data;
      // console.log('gor response ')
      // console.log(res)
      if(res.success){

        router.push('/signin');
      }
      else {
        
        throw new Error(res.message);
      }
    } catch (error : any) {
      toast.error(error?.message)
      setError(error?.message || "Signin failed.");
      
      
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="p-5 border border-white text-center rounded-md">
        <h1 className="text-3xl my-3 font-bold">Sign Up</h1>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="email"
            ref={emailRef}
            className="px-3 py-1 rounded-md"
          />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            className="px-3 py-1 rounded-md"
          />
        </div>

        <LoadingButton title="Sign Up" onClick={handleSignup} />
        
      
      <p className="mt-3 ">Already have an account? Signin <Link href="/signin" className="underline">here</Link></p>
      </div>
    <Toaster richColors/>

    </div>
  );
}
