import { Bell, Menu, Shield } from "lucide-react";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-4 md:px-6 py-3.5 shrink-0"
      style={{
        background: "rgba(12,22,38,0.95)",
        borderBottom: "1px solid rgba(33,50,71,0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="md:hidden text-gray-400 hover:text-white p-1"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">
            {title}
          </h1>
          <p className="text-xs" style={{ color: "#9AAAC0" }}>
            CyberShield AI • Real-time Protection
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative p-2 rounded-xl hover:bg-white/5 transition-colors"
        >
          <Bell size={18} className="text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          <Shield size={14} className="text-purple-400" />
          <span className="text-xs font-medium text-purple-300">Protected</span>
        </div>
      </div>
    </header>
  );
}
