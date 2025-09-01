import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
