"use client";
import { FormEvent, useRef } from "react";
import { useSearch } from "@/context/SearchContext";
import UserItem from "./UserItem";

export default function Search() {
  const { query, users, loading, error, searchUsers } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await searchUsers(inputRef.current?.value || "");
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
        <input
          ref={inputRef}
          defaultValue={query}
          className="flex-grow border px-2 py-1 rounded"
          placeholder="Search GitHub users"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Search
        </button>
      </form>
      {query && <p className="text-sm">Showing users for “{query}”</p>}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-2">
        {users.map((u) => (
          <UserItem key={u.login} user={u} />
        ))}
      </div>
    </div>
  );
}
