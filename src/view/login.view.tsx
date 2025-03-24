"use client";

// import api from "@/api"
import { useState } from "react";
import bgPatternImage from "@/assets/bg-pattern-decorative.png";
import LogoImage from "@/assets/logomark.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/api";
import Image from "next/image";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(email, password, rememberMe);
  };

  return (
    <>
      {/* Entire page container */}
      <div className='flex min-h-screen w-full flex-col items-center justify-center'>
        {/* Background image */}
        <div className='fixed top-1/12 z-[-1] max-w-7xl'>
          <Image
            src={bgPatternImage.src}
            width={14000}
            height={14000}
            alt=''
            className='w-full'
          />
        </div>

        {/* Login contents container */}
        <div className='-mt-20 flex w-full max-w-[1280px] flex-col items-center'>
          {/* Smaller container for login */}
          <div className='flex w-full max-w-[360px] flex-col items-center'>
            {/* Header container */}
            <div className='mb-8 flex w-full flex-col items-center gap-3'>
              <Image
                src={LogoImage.src}
                width={14000}
                height={14000}
                alt=''
                className='size-12'
              />
              <h2 className='text-center text-2xl font-bold'>
                Log in to your account
              </h2>
              <p className='text-center'>
                Welcome back! Please enter your details.
              </p>
            </div>

            {/* Form container */}
            <form onSubmit={handleLogin} className='flex w-full flex-col gap-5'>
              <div>
                <Label
                  className='mb-1 block text-sm font-medium'
                  htmlFor='email'>
                  Email
                </Label>
                <Input
                  type='email'
                  id='email'
                  placeholder='Enter your email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='w-full'
                />
              </div>
              <div>
                <Label
                  className='mb-1 block text-sm font-medium'
                  htmlFor='password'>
                  Password
                </Label>
                <Input
                  type='password'
                  id='password'
                  placeholder='Enter your password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='w-full'
                />
              </div>
              <div className='my-6 flex items-center justify-between text-sm'>
                <div className='flex items-center'>
                  <Checkbox
                    id='remember'
                    checked={rememberMe}
                    onClick={() => setRememberMe((prev) => !prev)}
                    className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  />
                  <Label htmlFor='remember' className='ml-2'>
                    Remember for 30 days
                  </Label>
                </div>
              </div>
              <Button type='submit' className='w-full'>
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
