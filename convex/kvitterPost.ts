import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import type { PostWithUserInfo } from "../types";

// Helper function to get posts with user info
async function getPostsWithUserInfoHelper(ctx: any) {
  const posts = await ctx.db.query("posts").collect();

  // Get all unique author IDs
  const authorIds = [
    ...new Set(posts.map((post: any) => post.authorClerkId)),
  ] as string[];

  // Fetch user info for all authors in parallel
  const userInfos = await Promise.all(
    authorIds.map(async (clerkId: string) => {
      const user = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", clerkId))
        .unique();
      return { clerkId, user };
    }),
  );

  // Create a map for quick lookup
  const userMap = new Map(
    userInfos.map(({ clerkId, user }) => [clerkId, user]),
  );

  // Return posts with user info
  return posts.map((post: any) => ({
    ...post,
    userInfo: userMap.get(post.authorClerkId) || null,
  }));
}

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await getPostsWithUserInfoHelper(ctx);
  },
});

export const createKvit = mutation({
  args: {
    content: v.string(),
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("posts", {
      content: args.content,
      views: 0,
      likes: [],
      rekvits: 0,
      authorClerkId: args.authorId,
      isOriginal: true,
      parentId: undefined,
    });
    return postId;
  },
});

export const getKvitsByUserId = query({
  args: { authorId: v.string() },
  handler: async (ctx, args) => {
    // Get posts for specific user
    const userPosts = await ctx.db
      .query("posts")
      .withIndex("by_author", (q) => q.eq("authorClerkId", args.authorId))
      .collect();

    // Get user info for this specific author
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", args.authorId))
      .unique();

    // Return posts with user info
    return userPosts.map((post: any) => ({
      ...post,
      userInfo: user,
    }));
  },
});

// New query specifically for getting posts with user info
export const getPostsWithUserInfo = query({
  args: {},
  handler: async (ctx) => {
    return await getPostsWithUserInfoHelper(ctx);
  },
});

export const getPostById = query({
  args: { postId: v.string() },
  handler: async (ctx, args): Promise<PostWithUserInfo | null> => {
    // Try to get the post, but handle invalid IDs gracefully
    let post;
    try {
      post = await ctx.db.get(args.postId as any);
    } catch (error) {
      // If the ID format is invalid, return null
      return null;
    }

    if (!post || !("authorClerkId" in post)) {
      return null;
    }

    // Get user info for the author
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q: any) => q.eq("clerkId", post.authorClerkId))
      .unique();

    return {
      ...post,
      userInfo: user
        ? {
            username: user.username,
            displayName: user.displayName,
            imageUrl: user.imageUrl,
          }
        : null,
    };
  },
});

export const toggleLike = mutation({
  args: {
    postId: v.id("posts"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }

    const currentLikes = post.likes;
    const isLiked = currentLikes.includes(args.userId);

    let newLikes;
    if (isLiked) {
      // Remove like
      newLikes = currentLikes.filter((id) => id !== args.userId);
    } else {
      // Add like
      newLikes = [...currentLikes, args.userId];
    }

    await ctx.db.patch(args.postId, {
      likes: newLikes,
    });

    return { isLiked: !isLiked, likeCount: newLikes.length };
  },
});
