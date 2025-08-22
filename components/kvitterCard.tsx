type KvitterCardProps = {
  Views: number;
  Rekvits: number;
  Likes: number;
  date: string;
  time: string;
  content: string;
  username: string;
  name: string;
};

export default function KvitterCard({
  Views,
  Rekvits,
  Likes,
  date,
  time,
  content,
  username = "usey",
  name = "namy",
}: KvitterCardProps) {
  return (
    <div>
      <div>
        <h2>{name}</h2>
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
          {Rekvits} Rekvits - {Likes} Likes
        </p>
      </div>
    </div>
  );
}
