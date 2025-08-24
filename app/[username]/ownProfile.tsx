"use client";
import { Authenticated, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "@/convex/_generated/api";

export default function OwnProfile({ username }: { username: string }) {
  const { user } = useUser();
  const createPost = useMutation(api.kvitterPost.create);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await createPost({
        content: content.trim(),
        autherId: user.id,
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
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-lg text-gray-600">Welcome back, @{username}!</p>
      </div>

      <Authenticated>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Create a new kvit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="kvit"
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Post Kvit"}
            </button>
          </form>
        </div>
      </Authenticated>
    </div>
  );
}
