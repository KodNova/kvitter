"use client";

export default function OtherProfile({ username }: { username: string }) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">@{username}</h1>
        <p className="text-lg text-gray-600">Profile</p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
            <span className="text-2xl text-gray-500">👤</span>
          </div>
          <h2 className="mb-2 text-xl font-semibold">@{username}</h2>
          <p className="mb-4 text-gray-600">
            Sign in to interact with this profile
          </p>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              You need to be signed in to reply to posts
            </p>
            <a
              href="/sign-in"
              className="inline-block rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
