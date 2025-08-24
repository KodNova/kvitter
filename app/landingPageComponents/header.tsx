import Link from "next/link";
import ProfileLink from "./headerProfileLink";
import HeaderSignOutButton from "@/app/landingPageComponents/headerSignOutButton";

export default function Header() {
  return (
    <div className="flex justify-between border-b-1 border-b-teal-300 p-2">
      <Link href={"/"}> Kvitter</Link>
      <div className="flex gap-4">
        <ProfileLink />
        <HeaderSignOutButton />
      </div>
    </div>
  );
}
