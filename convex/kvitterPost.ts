import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("posts").collect();
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
    const userPost = await ctx.db.query("posts").collect();
    const filterdPost = userPost.filter(
      (post) => post.authorClerkId === args.authorId,
    );
    return filterdPost;
  },
});
