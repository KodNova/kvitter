import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    content: v.string(),
    autherId: v.string(),
    isOriginal: v.boolean(),
    parentId: v.optional(v.string()),
  }).index("autherId", ["autherId"]),
});
