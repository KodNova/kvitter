type KvitterCardProps = {
  Views: number;
  Rekvits: number;
  Likes: string[];
  date: string;
  time: string;
  content: string;
  username: string;
  displayName: string;
};

export default function KvitterCard({
  Views,
  Rekvits,
  Likes,
  date,
  time,
  content,
  username = "usey",
  displayName = "Major Tom",
}: KvitterCardProps) {
  return (
    <div>
      <div>
        <h2>{displayName}</h2>
        <p>@{username}</p>
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
