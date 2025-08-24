//this is just for testing clerk
//
//
"use client";

import { SignIn } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

export default function Test() {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return (
      <>
        <SignIn></SignIn>
      </>
    );
  }
  return (
    <>
      <p> hello {user.username}</p>
      <p> your display name is {user.firstName}</p>
      <p> your id is {user.id}</p>
    </>
  );
}
