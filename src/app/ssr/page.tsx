import { SearchProvider } from "@/context/SearchContext";
import Search from "@/components/Search";

interface SearchParams { search?: string }

export default async function SSRPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const query = searchParams.search ?? "";
  let users = [];
  if (query) {
    const res = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=5`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      users = data.items ?? [];
    }
  }

  return (
    <SearchProvider initialQuery={query} initialUsers={users}>
      <Search />
    </SearchProvider>
  );
}
