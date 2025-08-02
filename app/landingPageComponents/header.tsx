import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between p-2">
      <Link href={"/"}> Kvitter</Link>
      <div>
        <p>profile</p>
      </div>
    </div>
  );
}
