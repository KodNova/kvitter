"use client";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export default function PostPage() {
  const params = useParams();
  const postid: string = params.postid as string;

  const postData = useQuery(api.kvitterPost.getPostById, {
    postId: postid,
  });

  if (postData === undefined) {
    return <div>Loading...</div>;
  }

  if (postData === null) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center space-x-3">
            <img
              src={postData.userInfo?.imageUrl || "/default-avatar.png"}
              alt={postData.userInfo?.username || "User"}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-gray-900">
                {postData.userInfo?.displayName ||
                  postData.userInfo?.username ||
                  "Unknown"}
              </h3>
              <p className="text-sm text-gray-500">
                @{postData.userInfo?.username || "unknown"}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-lg leading-relaxed text-gray-900">
              {postData.content}
            </p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span>❤️ {postData.likes.length} likes</span>
            <span>👁️ {postData.views} views</span>
            <span>🔄 {postData.rekvits} rekvits</span>
          </div>
        </div>
      </div>
    </div>
  );
}
