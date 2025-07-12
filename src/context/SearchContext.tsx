"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface GitHubUser {
  login: string;
}

interface SearchContextProps {
  query: string;
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
  searchUsers: (q: string) => Promise<void>;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}

interface ProviderProps {
  initialQuery?: string;
  initialUsers?: GitHubUser[];
  children: ReactNode;
}

export function SearchProvider({
  initialQuery = "",
  initialUsers = [],
  children,
}: ProviderProps) {
  const [query, setQuery] = useState(initialQuery);
  const [users, setUsers] = useState<GitHubUser[]>(initialUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = async (q: string) => {
    try {
      setLoading(true);
      setError(null);
      setQuery(q);
      if (!q) {
        setUsers([]);
        return;
      }
      const res = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(
          q
        )}&per_page=5`
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.items ?? []);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContext.Provider
      value={{ query, users, loading, error, searchUsers }}
    >
      {children}
    </SearchContext.Provider>
  );
}
