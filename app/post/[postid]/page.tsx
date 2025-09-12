"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import KvitterCard from "@/components/kvitterCard";
import { formatDate, formatTime } from "@/utils/dateUtils";
import { useUser } from "@clerk/nextjs";

export default function PostPage() {
  const params = useParams();
  const postid: string = params.postid as string;
  const { user } = useUser();

  const kvit = useQuery(api.kvitterPost.getPostById, {
    postId: postid,
  });

  if (kvit === undefined) {
    return <div>Loading...</div>;
  }

  if (kvit === null) {
    return <div>Post not found</div>;
  }

  return (
    <KvitterCard
      _id={kvit._id}
      Rekvits={kvit.rekvits}
      Likes={kvit.likes}
      key={kvit._id}
      date={formatDate(kvit._creationTime)}
      time={formatTime(kvit._creationTime)}
      content={kvit.content}
      userInfo={kvit.userInfo}
      currentUserId={user?.id}
      isPostPage={true}
    />
  );
}
