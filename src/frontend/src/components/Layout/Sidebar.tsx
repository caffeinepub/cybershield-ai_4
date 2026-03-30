import {
  BarChart2,
  LayoutDashboard,
  MessageSquare,
  Phone,
  Shield,
  Upload,
  X,
} from "lucide-react";
import type { PageId } from "../../App";

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  {
    id: "analyze",
    label: "Analyze Message",
    icon: <MessageSquare size={18} />,
  },
  { id: "image", label: "Image Upload", icon: <Upload size={18} /> },
  { id: "reports", label: "Reports", icon: <BarChart2 size={18} /> },
  { id: "helplines", label: "Helplines", icon: <Phone size={18} /> },
];

export default function Sidebar({
  currentPage,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onClose();
          }}
        />
      )}

      <aside
        className={`fixed md:static z-30 top-0 left-0 h-full w-64 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          background: "#0C1626",
          borderRight: "1px solid rgba(33,50,71,0.8)",
          minWidth: 260,
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-5 border-b"
          style={{ borderColor: "rgba(33,50,71,0.8)" }}
        >
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #8B5CF6 0%, #F97316 100%)",
            }}
          >
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm tracking-wide">
              CyberShield AI
            </div>
            <div className="text-xs" style={{ color: "#9AAAC0" }}>
              Protection System
            </div>
          </div>
          <button
            type="button"
            className="ml-auto md:hidden text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="px-2 pb-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "#4A6080" }}
            >
              Navigation
            </span>
          </div>
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                style={
                  active
                    ? {
                        background:
                          "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(249,115,22,0.2) 100%)",
                        border: "1px solid rgba(139,92,246,0.3)",
                      }
                    : {}
                }
              >
                <span className={active ? "text-orange-400" : ""}>
                  {item.icon}
                </span>
                {item.label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400" />
                )}
              </button>
            );
          })}
        </nav>

        <div
          className="px-5 py-4 border-t"
          style={{ borderColor: "rgba(33,50,71,0.8)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #F97316)",
              }}
            >
              AI
            </div>
            <div>
              <div className="text-xs font-semibold text-white">
                CyberShield AI
              </div>
              <div className="text-xs" style={{ color: "#9AAAC0" }}>
                v2.1.0 Active
              </div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </div>
      </aside>
    </>
  );
}
