"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import Header from "./header";
import KvitterCard from "@/components/kvitterCard";
import { formatDate, formatTime } from "@/utils/dateUtils";
import type { PostWithUserInfo } from "@/types";

export default function LandingPage() {
  const trending = useQuery(api.kvitterPost.get);
  const { user } = useUser();
  
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">Welcome to Kvitter</h1>
          <p className="text-lg">
            A Twitter clone built with Next.js and Convex
          </p>
        </div>

        <h1 className="mt-10 text-2xl">Trending kvitters!</h1>
        <div className="flex flex-col gap-2 border-1 border-green-800 p-2">
          {trending?.map((kvit: PostWithUserInfo) => (
            <KvitterCard
              _id={kvit._id}
              Rekvits={kvit.rekvits}
              Likes={kvit.likes}
              Views={kvit.views}
              key={kvit._id}
              date={formatDate(kvit._creationTime)}
              time={formatTime(kvit._creationTime)}
              content={kvit.content}
              userInfo={kvit.userInfo}
              currentUserId={user?.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
