import { SearchProvider } from "@/context/SearchContext";
import Search from "@/components/Search";

export default function CSRPage() {
  return (
    <SearchProvider>
      <Search />
    </SearchProvider>
  );
}
