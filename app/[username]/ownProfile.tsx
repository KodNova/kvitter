"use client";
import { Authenticated, useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import KvitterCard from "@/components/kvitterCard";
import { formatDate, formatTime } from "@/utils/dateUtils";
import type { PostWithUserInfo } from "@/types";

export default function OwnProfile({ username }: { username: string }) {
  const { user } = useUser();
  const createKvit = useMutation(api.kvitterPost.createKvit);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user's posts
  const usersOwnPosts = useQuery(
    api.kvitterPost.getKvitsByUserId,
    user ? { authorId: user.id } : "skip",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await createKvit({
        content: content.trim(),
        authorId: user.id,
      });
      setContent("");
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Authenticated>
        {/* Profile Header */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold">@{username}</h1>
          <p className="text-gray-600">Your Profile</p>
        </div>

        {/* Create New Post */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Create New Kvit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              rows={3}
              maxLength={280}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {content.length}/280 characters
              </span>
              <button
                type="submit"
                disabled={!content.trim() || isSubmitting}
                className="rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {isSubmitting ? "Posting..." : "Post Kvitter"}
              </button>
            </div>
          </form>
        </div>

        {/* Display user's posts */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Your Posts</h2>
          {usersOwnPosts === undefined ? (
            <p className="text-gray-500">Loading your posts...</p>
          ) : usersOwnPosts.length === 0 ? (
            <p className="text-gray-500">You haven't posted anything yet.</p>
          ) : (
            <div className="space-y-4">
              {usersOwnPosts.map((kvit: PostWithUserInfo) => (
                <KvitterCard
                  _id={kvit._id}
                  Rekvits={kvit.rekvits}
                  Likes={kvit.likes}
                  Views={kvit.views}
                  key={kvit._id}
                  date={formatDate(kvit._creationTime)}
                  time={formatTime(kvit._creationTime)}
                  content={kvit.content}
                  userInfo={kvit.userInfo}
                  currentUserId={user?.id}
                />
              ))}
            </div>
          )}
        </div>
      </Authenticated>
    </div>
  );
}
