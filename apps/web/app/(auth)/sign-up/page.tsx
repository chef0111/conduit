'use client';

import Link from 'next/link';
import { useState } from 'react';

import { GitHubIcon, GoogleIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="bg-background flex w-full flex-col items-center justify-center p-6 sm:p-8 lg:w-1/2">
      <div className="w-full max-w-md md:max-w-lg xl:max-w-xl">
        {/* Titles */}
        <div className="mb-6 text-center">
          <h2 className="text-foreground mb-2 text-3xl font-medium tracking-tight">
            Create your Account
          </h2>
          <p className="text-muted-foreground text-base">
            Let&apos;s get started with your 30 days free trial
          </p>
        </div>

        {/* Google Login Button */}
        <div className="mb-6 flex w-full items-center gap-4 lg:flex-col">
          <Button variant="outline" className="min-w-0 max-lg:flex-1 lg:w-full">
            <GoogleIcon />
            <span className="ml-1 max-lg:hidden">Continue with Google</span>
          </Button>
          <Button variant="outline" className="min-w-0 max-lg:flex-1 lg:w-full">
            <GitHubIcon />
            <span className="ml-1 max-lg:hidden">Continue with GitHub</span>
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-6 flex items-center">
          <Separator orientation="horizontal" className="flex-1 grow" />
          <span className="text-muted-foreground px-4 text-[13px]">
            Or continue with
          </span>
          <Separator orientation="horizontal" className="flex-1 grow" />
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Conduit" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="conduitdotcom" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@conduit.com" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" />
          </div>

          {/* Checkbox */}
          <div className="mt-1 flex items-start gap-3">
            <Checkbox id="terms" />
            <Label htmlFor="terms">
              I agree to all Terms and Privacy Policy.
            </Label>
          </div>

          {/* Sign Up Button */}
          <div className="mt-2">
            <Button type="submit" size="lg" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-muted-foreground mt-6 text-xs">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-foreground font-semibold underline-offset-3 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
