"use client";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import OwnProfile from "./ownProfile";
import OtherProfile from "./otherProfile";

export default function ProfilePage() {
  const params = useParams();
  const username: string = params.username as string;
  const { user, isLoaded } = useUser();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if this is the user's own profile
  const isOwnProfile = user?.username === username;

  // Render appropriate profile component
  if (isOwnProfile) {
    return <OwnProfile username={username} />;
  } else {
    return <OtherProfile username={username} />;
  }
}
