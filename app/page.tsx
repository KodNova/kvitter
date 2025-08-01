"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const trending = useQuery(api.kvitterPost.get);
  return (
    <>
      <p>just a old school _witter clone using clerk auth and convex</p>
      <div>
        <h1>Trending kvitters!</h1>
        <div className="flex gap-2">
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
