import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Preview from "@/components/layout/Preview";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
        <Sidebar />
        <Preview />
      </div>
    </main>
  );
}