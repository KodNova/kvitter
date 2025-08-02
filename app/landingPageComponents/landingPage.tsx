"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Header from "./header";

export default function LandingPage() {
  const trending = useQuery(api.kvitterPost.get);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <h1>Trending kvitters!</h1>
        <div className="flex flex-col gap-2 border-1 border-green-800 p-2">
          {trending?.map(({ _id, content, autherId }) => (
            <div className="border-1 border-green-500 p-2" key={_id}>
              <h2>{autherId}:</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
