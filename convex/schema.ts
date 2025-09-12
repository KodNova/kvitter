import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    displayName: v.string(),
    username: v.string(),
    imageUrl: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_username", ["username"]),

  posts: defineTable({
    authorClerkId: v.string(), // Store Clerk ID
    content: v.string(),
    views: v.number(),
    likes: v.array(v.string()), // Array of Clerk IDs
    rekvits: v.number(),
    isOriginal: v.boolean(),
    parentId: v.optional(v.id("posts")),
  }).index("by_author", ["authorClerkId"]),
});
