import Link from "next/link";
import { LayoutDashboard, Package, Upload, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-zinc-900 border-r border-zinc-800 flex-shrink-0 flex-col">
        <div className="p-6 border-b border-zinc-800">
          <Link href="/admin" className="font-bebas text-2xl tracking-widest text-white">
            KAIZO<span className="text-zinc-500"> ADMIN</span>
          </Link>
          <p className="text-zinc-600 text-xs mt-1 uppercase tracking-widest">Command Center</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link href="/admin" className="flex items-center px-4 py-3 text-sm font-medium rounded-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            <LayoutDashboard className="w-4 h-4 mr-3" />
            Dashboard
          </Link>
          <Link href="/admin/products/new" className="flex items-center px-4 py-3 text-sm font-medium rounded-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            <Upload className="w-4 h-4 mr-3" />
            New Drop
          </Link>
        </nav>

        <div className="p-3 border-t border-zinc-800">
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-sm font-medium rounded-sm text-zinc-400 hover:bg-red-950 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Exit to Store
          </Link>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 py-4 flex items-center justify-between">
        <Link href="/admin" className="font-bebas text-xl tracking-widest text-white">
          KAIZO<span className="text-zinc-500"> ADMIN</span>
        </Link>
        <div className="flex gap-3">
          <Link href="/admin/products/new" className="text-xs font-bold uppercase tracking-widest text-white bg-zinc-800 px-3 py-2 rounded-sm">
            + New Drop
          </Link>
          <Link href="/" className="text-xs font-bold uppercase tracking-widest text-zinc-400 px-3 py-2">
            Exit
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-zinc-950 p-6 md:p-10 mt-[60px] md:mt-0">
        {children}
      </main>
    </div>
  );
}
