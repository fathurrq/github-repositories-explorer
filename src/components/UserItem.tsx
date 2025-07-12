"use client";
import { useState } from "react";

interface Props {
  user: { login: string };
}

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

export default function UserItem({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = async () => {
    if (!open && repos.length === 0) {
      try {
        setLoading(true);
        const res = await fetch(`https://api.github.com/users/${user.login}/repos`);
        if (!res.ok) throw new Error("Failed to fetch repos");
        const data = await res.json();
        setRepos(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    setOpen((o) => !o);
  };

  return (
    <div className="border p-2 rounded">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center"
        aria-expanded={open}
      >
        <span>{user.login}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {loading && <p>Loading repos...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {repos.map((r) => (
            <div key={r.id} className="border p-2 rounded">
              <div className="flex justify-between">
                <span className="font-medium">{r.name}</span>
                <span>⭐ {r.stargazers_count}</span>
              </div>
              {r.description && <p className="text-sm">{r.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
