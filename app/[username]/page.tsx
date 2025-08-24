"use client";
import { Authenticated, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "@/convex/_generated/api";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username: string = params.username;
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
    <>
      <p>Profile for {username}</p>
      <Authenticated>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="kvit"
            placeholder="Enter your kvit"
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
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </Authenticated>
    </>
  );
}
