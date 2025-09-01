import type { UserInfo } from "@/types";

type KvitterCardProps = {
  Views: number;
  Rekvits: number;
  Likes: string[];
  date: string;
  time: string;
  content: string;
  userInfo: UserInfo | null;
};

export default function KvitterCard({
  Views,
  Rekvits,
  Likes,
  date,
  time,
  content,
  userInfo,
}: KvitterCardProps) {
  return (
    <div>
      <div>
        {userInfo?.imageUrl && (
          <img
            src={userInfo.imageUrl}
            alt={`${userInfo.displayName}'s avatar`}
            className="mr-2 h-10 w-10 rounded-full"
          />
        )}
        <h2>{userInfo?.displayName || "Unknown User"}</h2>
        <p>@{userInfo?.username || "unknown"}</p>
      </div>
      <div>
        <p>{content}</p>
      </div>
      <div>
        <p>
          {time} - {date} - {Views} Views
        </p>
        <p>
          {Rekvits} Rekvits - {Likes.length} Likes
        </p>
      </div>
    </div>
  );
}
