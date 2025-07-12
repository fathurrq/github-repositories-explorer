import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">GitHub Explorer</h1>
      <p>Select a mode:</p>
      <div className="flex gap-4">
        <Link href="/csr" className="px-4 py-2 bg-blue-600 text-white rounded">Client Rendering</Link>
        <Link href="/ssr" className="px-4 py-2 bg-blue-600 text-white rounded">Server Rendering</Link>
      </div>
    </main>
  );
}
