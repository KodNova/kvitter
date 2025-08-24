"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { Authenticated } from "convex/react";
import Link from "next/link";

export default function ProfileLink() {
  const { user } = useUser();

  if (user?.username) {
    return (
      <Authenticated>
        <Link href={`/${user.username}`}>Profile</Link>
      </Authenticated>
    );
  }

  // Return sign in button when no username
  return <SignInButton>Sign in</SignInButton>;
}
