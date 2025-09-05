import type { UserInfo } from "@/types";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type KvitterCardProps = {
  _id: Id<"posts">;
  Views: number;
  Rekvits: number;
  Likes: string[];
  date: string;
  time: string;
  content: string;
  userInfo: UserInfo | null;
  currentUserId?: string;
};

export default function KvitterCard({
  _id,
  Views,
  Rekvits,
  Likes,
  date,
  time,
  content,
  userInfo,
  currentUserId,
}: KvitterCardProps) {
  const toggleLike = useMutation(api.kvitterPost.toggleLike);
  
  const isLiked = currentUserId ? Likes.includes(currentUserId) : false;
  
  const handleLikeClick = async () => {
    if (!currentUserId) return;
    
    try {
      await toggleLike({
        postId: _id,
        userId: currentUserId,
      });
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center space-x-3">
        {userInfo?.imageUrl && (
          <img
            src={userInfo.imageUrl}
            alt={`${userInfo.displayName}'s avatar`}
            className="h-10 w-10 rounded-full"
          />
        )}
        <div>
          <h2 className="font-semibold text-gray-900">{userInfo?.displayName || "Unknown User"}</h2>
          <p className="text-sm text-gray-500">@{userInfo?.username || "unknown"}</p>
        </div>
      </div>
      
      <div className="text-gray-800">
        <p>{content}</p>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{time} - {date}</span>
          <span>{Views} Views</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>{Rekvits} Rekvits</span>
          <button
            onClick={handleLikeClick}
            disabled={!currentUserId}
            className={`flex items-center space-x-1 hover:opacity-70 transition-opacity ${
              !currentUserId ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <img
              src={isLiked ? "/heart-full.svg" : "/heart-empty.svg"}
              alt={isLiked ? "Unlike" : "Like"}
              className="h-4 w-4"
            />
            <span>{Likes.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
