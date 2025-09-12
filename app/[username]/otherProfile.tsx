"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import KvitterCard from "@/components/kvitterCard";
import type { PostWithUserInfo } from "@/types";

export default function OtherProfile({ username }: { username: string }) {
  const { user } = useUser();
  const clerkId = useQuery(api.users.getClerkIdByUsername, { username });
  const posts = useQuery(
    api.kvitterPost.getKvitsByUserId,
    clerkId ? { authorId: clerkId } : "skip",
  );
  const userInfo = useQuery(
    api.users.getUserInfoByClerkId,
    clerkId ? { clerkId } : "skip",
  );

  // Show loading state while clerkId is loading
  if (clerkId === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user doesn't exist, show error message
  if (clerkId === null) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">@{username}</h1>
          <p className="text-lg text-gray-600">Profile not found</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
              <span className="text-2xl text-gray-500">❌</span>
            </div>
            <h2 className="mb-2 text-xl font-semibold">User not found</h2>
            <p className="text-gray-600">
              The user @{username} does not exist or has been deleted.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while posts and userInfo are loading
  if (posts === undefined || userInfo === undefined) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">@{username}</h1>
        <p className="text-lg text-gray-600">Profile</p>
      </div>

      {/* User Profile Header */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
            {userInfo!.imageUrl ? (
              <img
                src={userInfo!.imageUrl}
                alt={`${userInfo!.displayName}'s avatar`}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-500">👤</span>
            )}
          </div>
          <h2 className="mb-2 text-xl font-semibold">
            {userInfo!.displayName}
          </h2>
          <p className="mb-4 text-gray-600">@{userInfo!.username}</p>

          {!user && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Sign in to interact with this profile
              </p>
              <a
                href="/sign-in"
                className="inline-block rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
              >
                Sign In
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Posts ({posts.length})
        </h3>

        {posts.length === 0 ? (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <span className="text-2xl text-gray-400">📝</span>
              </div>
              <h4 className="mb-2 text-lg font-medium text-gray-900">
                No posts yet
              </h4>
              <p className="text-gray-600">
                @{username} hasn't posted anything yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post: PostWithUserInfo) => (
              <KvitterCard
                key={post._id}
                _id={post._id}
                Views={post.views}
                Rekvits={post.rekvits}
                Likes={post.likes}
                date={new Date(post._creationTime).toLocaleDateString()}
                time={new Date(post._creationTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                content={post.content}
                userInfo={post.userInfo}
                currentUserId={user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
