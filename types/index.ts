import type { Doc } from "@/convex/_generated/dataModel";

// Type for user info that comes with posts
export interface UserInfo {
  username: string;
  displayName: string;
  imageUrl?: string | null;
}

// Type for posts with embedded user info
export interface PostWithUserInfo extends Doc<"posts"> {
  userInfo: UserInfo | null;
}

// Type for the return value of our Convex queries
export type PostsWithUserInfo = PostWithUserInfo[];
