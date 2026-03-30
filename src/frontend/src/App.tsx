import { useState } from "react";
import Header from "./components/Layout/Header";
import Sidebar from "./components/Layout/Sidebar";
import type { AnalysisResult } from "./lib/detection";
import { ACTIVITY_FEED, INITIAL_STATS } from "./lib/mockData";
import type { ActivityItem } from "./lib/mockData";
import AnalyzeMessage from "./pages/AnalyzeMessage";
import Dashboard from "./pages/Dashboard";
import Helplines from "./pages/Helplines";
import ImageUpload from "./pages/ImageUpload";
import Reports from "./pages/Reports";

export type PageId =
  | "dashboard"
  | "analyze"
  | "image"
  | "reports"
  | "helplines";

export interface AnalysisRecord {
  id: string;
  text: string;
  result: AnalysisResult;
  timestamp: string;
  source: "chat" | "image";
}

export interface AppStats {
  totalAnalyzed: number;
  bullyingDetected: number;
  safeMessages: number;
  accuracy: number;
}

function formatTimestamp(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
}

export default function App() {
  const [page, setPage] = useState<PageId>("dashboard");
  const [isDark] = useState(true);
  const [stats, setStats] = useState<AppStats>(INITIAL_STATS);
  const [history, setHistory] = useState<AnalysisRecord[]>([]);
  const [feed, setFeed] = useState<ActivityItem[]>(ACTIVITY_FEED);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addAnalysis = (
    text: string,
    result: AnalysisResult,
    source: "chat" | "image",
  ) => {
    const record: AnalysisRecord = {
      id: Date.now().toString(),
      text,
      result,
      timestamp: formatTimestamp(),
      source,
    };
    setHistory((prev) => [record, ...prev].slice(0, 50));
    setStats((prev) => ({
      totalAnalyzed: prev.totalAnalyzed + 1,
      bullyingDetected: prev.bullyingDetected + (result.isBullying ? 1 : 0),
      safeMessages: prev.safeMessages + (result.isBullying ? 0 : 1),
      accuracy: Number.parseFloat(
        (
          (prev.accuracy * prev.totalAnalyzed +
            (result.isBullying ? result.confidence : result.confidence)) /
          (prev.totalAnalyzed + 1)
        ).toFixed(1),
      ),
    }));
    const newItem: ActivityItem = {
      id: record.id,
      text: text.slice(0, 60) + (text.length > 60 ? "..." : ""),
      isBullying: result.isBullying,
      category: result.flaggedWords[0]?.category,
      timestamp: "Just now",
      flaggedWords: result.flaggedWords.map((f) => f.word),
    };
    setFeed((prev) => [newItem, ...prev].slice(0, 20));
  };

  const pageNames: Record<PageId, string> = {
    dashboard: "Dashboard",
    analyze: "Analyze Message",
    image: "Image Upload",
    reports: "Reports",
    helplines: "Helplines",
  };

  return (
    <div
      className={`flex h-screen overflow-hidden ${isDark ? "dark" : ""}`}
      style={{ background: "#0B1220", fontFamily: "'Inter', sans-serif" }}
    >
      <Sidebar
        currentPage={page}
        onNavigate={(p) => {
          setPage(p);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          title={pageNames[page]}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main
          className="flex-1 overflow-y-auto"
          style={{
            background: "linear-gradient(135deg, #0B1220 0%, #0E1A2B 100%)",
          }}
        >
          <div className="p-4 md:p-6">
            {page === "dashboard" && (
              <Dashboard stats={stats} feed={feed} onNavigate={setPage} />
            )}
            {page === "analyze" && (
              <AnalyzeMessage history={history} onAnalyze={addAnalysis} />
            )}
            {page === "image" && <ImageUpload onAnalyze={addAnalysis} />}
            {page === "reports" && <Reports stats={stats} history={history} />}
            {page === "helplines" && <Helplines />}
          </div>
        </main>
      </div>
    </div>
  );
}
