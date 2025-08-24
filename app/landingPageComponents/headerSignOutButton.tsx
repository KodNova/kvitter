"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Authenticated } from "convex/react";

export default function HeaderSignOutButton() {
  return (
    <Authenticated>
      <SignOutButton></SignOutButton>
    </Authenticated>
  );
}
