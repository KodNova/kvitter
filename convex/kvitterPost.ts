import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("posts").collect();
  },
});

export const create = mutation({
  args: {
    content: v.string(),
    autherId: v.string(),
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("posts", {
      content: args.content,
      views: 0,
      likes: 0,
      rekvits: 0,
      autherId: args.autherId,
      isOriginal: true,
      parentId: undefined,
    });
    return postId;
  },
});
