import {
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  Target,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { AppStats, PageId } from "../App";
import { CATEGORY_CONFIG } from "../lib/detection";
import type { ActivityItem } from "../lib/mockData";

interface DashboardProps {
  stats: AppStats;
  feed: ActivityItem[];
  onNavigate: (page: PageId) => void;
}

function useCountUp(target: number, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else setValue(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

interface StatCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  border: string;
  delta?: string;
  deltaPositive?: boolean;
  animated?: boolean;
}

function StatCard({
  title,
  value,
  suffix = "",
  icon,
  color,
  gradient,
  border,
  delta,
  deltaPositive,
  animated = true,
}: StatCardProps) {
  const numericValue =
    typeof value === "number" ? value : Number.parseFloat(value as string);
  const counted = useCountUp(animated ? numericValue : 0);
  const displayValue = animated
    ? Number.isInteger(numericValue)
      ? counted
      : numericValue
    : value;

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "linear-gradient(135deg, #111C2C, #0F1A29)",
        border: `1px solid ${border}`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl" style={{ background: gradient }}>
          <span style={{ color }}>{icon}</span>
        </div>
        {delta && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-lg ${
              deltaPositive
                ? "text-green-400 bg-green-400/10"
                : "text-orange-400 bg-orange-400/10"
            }`}
          >
            {delta}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm" style={{ color: "#9AAAC0" }}>
        {title}
      </div>
    </div>
  );
}

const CATEGORY_BREAKDOWN = [
  { key: "insult", count: 111 },
  { key: "aggressive", count: 89 },
  { key: "bullying", count: 66 },
  { key: "sexual", count: 54 },
  { key: "discrimination", count: 42 },
  { key: "bodyshaming", count: 38 },
  { key: "inappropriate", count: 52 },
] as const;

const TOTAL_BREAKDOWN = CATEGORY_BREAKDOWN.reduce((s, i) => s + i.count, 0);

export default function Dashboard({ stats, feed, onNavigate }: DashboardProps) {
  const bullyRate = (
    (stats.bullyingDetected / stats.totalAnalyzed) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Overview</h2>
          <p className="text-sm" style={{ color: "#9AAAC0" }}>
            Real-time cyberbullying detection metrics
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(0,200,150,0.1)",
            border: "1px solid rgba(0,200,150,0.3)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#00C896" }}
          />
          <span className="text-sm font-medium" style={{ color: "#00C896" }}>
            System Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Messages Analyzed"
          value={stats.totalAnalyzed}
          icon={<MessageSquare size={20} />}
          color="#60A5FA"
          gradient="rgba(96,165,250,0.15)"
          border="rgba(96,165,250,0.2)"
          delta="+5.2%"
          deltaPositive
        />
        <StatCard
          title="Bullying Detected"
          value={stats.bullyingDetected}
          icon={<AlertTriangle size={20} />}
          color="#F97316"
          gradient="rgba(249,115,22,0.15)"
          border="rgba(249,115,22,0.2)"
          delta={`${bullyRate}% rate`}
          deltaPositive={false}
        />
        <StatCard
          title="Safe Messages"
          value={stats.safeMessages}
          icon={<CheckCircle size={20} />}
          color="#00C896"
          gradient="rgba(0,200,150,0.15)"
          border="rgba(0,200,150,0.2)"
          delta="74.5% safe"
          deltaPositive
        />
        <StatCard
          title="Detection Accuracy"
          value={stats.accuracy}
          suffix="%"
          icon={<Target size={20} />}
          color="#00C896"
          gradient="rgba(0,200,150,0.15)"
          border="rgba(0,200,150,0.2)"
          delta="High precision"
          deltaPositive
          animated={false}
        />
      </div>

      {/* Category badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {(
          Object.entries(CATEGORY_CONFIG) as [
            string,
            (typeof CATEGORY_CONFIG)[keyof typeof CATEGORY_CONFIG],
          ][]
        ).map(([key, cfg]) => (
          <div
            key={key}
            className="rounded-xl px-3 py-2.5 flex items-center gap-2"
            style={{
              background: "rgba(17,28,44,0.8)",
              border: `1px solid ${cfg.color}25`,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: cfg.color }}
            />
            <div>
              <div className="text-xs font-semibold text-white leading-tight">
                {cfg.label.split("/")[0]}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="lg:col-span-2 rounded-2xl p-5"
          style={{
            background: "linear-gradient(135deg, #111C2C, #0F1A29)",
            border: "1px solid rgba(33,50,71,0.8)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} style={{ color: "#FB923C" }} />
              <span className="text-white font-semibold text-sm">
                Recent Activity
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("analyze")}
              className="text-xs hover:opacity-80 transition-opacity"
              style={{ color: "#FB923C" }}
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {feed.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                style={{ border: "1px solid rgba(33,50,71,0.4)" }}
              >
                <div
                  className="mt-1 w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    background: item.isBullying ? "#F97316" : "#00C896",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.isBullying ? (
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: item.category
                            ? CATEGORY_CONFIG[item.category].color
                            : "#F97316",
                        }}
                      >
                        {item.category
                          ? CATEGORY_CONFIG[item.category].label
                          : "Bullying Detected"}
                      </span>
                    ) : (
                      <span
                        className="text-xs font-medium"
                        style={{ color: "#00C896" }}
                      >
                        Safe Message
                      </span>
                    )}
                    <span className="text-xs" style={{ color: "#4A6080" }}>
                      • {item.timestamp}
                    </span>
                  </div>
                </div>
                <span
                  className="shrink-0 text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: item.isBullying
                      ? "rgba(249,115,22,0.15)"
                      : "rgba(0,200,150,0.15)",
                    color: item.isBullying ? "#F97316" : "#00C896",
                  }}
                >
                  {item.isBullying ? "Alert" : "Safe"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="rounded-2xl p-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(251,146,60,0.1))",
              border: "1px solid rgba(249,115,22,0.3)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} style={{ color: "#F97316" }} />
              <span className="text-white font-semibold text-sm">
                Quick Analyze
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: "#9AAAC0" }}>
              Paste any message to instantly check for cyberbullying content.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("analyze")}
              className="w-full py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #F97316, #C2410C)",
              }}
            >
              Start Analysis
            </button>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: "linear-gradient(135deg, #111C2C, #0F1A29)",
              border: "1px solid rgba(33,50,71,0.8)",
            }}
          >
            <div className="text-white font-semibold text-sm mb-4">
              Category Breakdown
            </div>
            <div className="space-y-2.5">
              {CATEGORY_BREAKDOWN.map((item) => {
                const cfg = CATEGORY_CONFIG[item.key];
                return (
                  <div key={item.key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "#9AAAC0" }}>
                        {cfg.label.split("/")[0]}
                      </span>
                      <span
                        className="font-semibold"
                        style={{ color: cfg.color }}
                      >
                        {item.count}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(item.count / TOTAL_BREAKDOWN) * 100}%`,
                          background: cfg.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
