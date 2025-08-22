"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Header from "./header";
import KvitterCard from "@/components/kvitterCard";
import { formatDate, formatTime } from "@/utils/dateUtils";

export default function LandingPage() {
  const trending = useQuery(api.kvitterPost.get);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h1>Trending kvitters!</h1>
        <div className="flex flex-col gap-2 border-1 border-green-800 p-2">
          {trending?.map((kvit) => (
            <KvitterCard
              Rekvits={kvit.rekvits}
              Likes={kvit.likes}
              Views={kvit.views}
              key={kvit._id}
              date={formatDate(kvit._creationTime)}
              time={formatTime(kvit._creationTime)}
              content={kvit.content}
              username={kvit.autherId}
              name={"need to get name"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
