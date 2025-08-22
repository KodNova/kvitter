"use client";
import { SignIn, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export default function ProfilePage() {
  return (
    <>
      <Authenticated>
        <p>profile</p>
        <p>ok</p>
      </Authenticated>
      <Unauthenticated>
        <SignIn></SignIn>
      </Unauthenticated>
    </>
  );
}
