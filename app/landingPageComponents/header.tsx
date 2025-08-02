import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between border-b-1 border-b-teal-300 p-2">
      <Link href={"/"}> Kvitter</Link>
      <div>
        <p>profile</p>
      </div>
    </div>
  );
}
