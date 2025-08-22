import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    content: v.string(),
    views: v.number(),
    likes: v.number(),
    rekvits: v.number(),
    autherId: v.string(),
    isOriginal: v.boolean(),
    parentId: v.optional(v.string()),
  }).index("autherId", ["autherId"]),
});
