import { Award, BarChart2, PieChart, TrendingUp } from "lucide-react";
import type { AnalysisRecord, AppStats } from "../App";
import { CATEGORY_CONFIG } from "../lib/detection";
import { MONTHLY_DATA, TOP_BULLY_WORDS, WEEKLY_DATA } from "../lib/mockData";

interface ReportsProps {
  stats: AppStats;
  history: AnalysisRecord[];
}

const DANGER_COLOR = "#F97316";
const SAFE_COLOR = "#00C896";

function DonutChart({ bullying, safe }: { bullying: number; safe: number }) {
  const bullyingTotal = 318;
  const total = bullyingTotal + safe;
  const r = 70;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * r;

  const segments = [
    { label: "Bullying Detected", value: bullyingTotal, color: DANGER_COLOR },
    { label: "Safe", value: safe, color: SAFE_COLOR },
  ];

  let offset = 0;

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 200 200"
        width="220"
        height="220"
        role="img"
        aria-label="Detection breakdown donut chart"
      >
        <title>Detection Breakdown</title>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={DANGER_COLOR}
          strokeWidth="34"
          opacity="0.06"
        />
        {segments.map((seg) => {
          const frac = seg.value / total;
          const dash = frac * circumference;
          const gap = circumference - dash;
          const rotation = (offset / total) * 360 - 90;
          offset += seg.value;
          return (
            <circle
              key={seg.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="28"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={0}
              transform={`rotate(${rotation} ${cx} ${cy})`}
              style={{
                transition: "stroke-dasharray 0.8s ease",
                filter: `drop-shadow(0 0 6px ${seg.color}60)`,
              }}
            />
          );
        })}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fill="white"
          fontSize="22"
          fontWeight="bold"
        >
          {(bullying + safe).toLocaleString()}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fill="#9AAAC0"
          fontSize="10"
        >
          Total
        </text>
      </svg>

      <div className="flex flex-col gap-3 mt-1 w-full max-w-[200px]">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{
                  background: seg.color,
                  boxShadow: `0 0 6px ${seg.color}80`,
                }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "#9AAAC0" }}
              >
                {seg.label}
              </span>
            </div>
            <span className="text-xs font-bold" style={{ color: seg.color }}>
              {((seg.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupedBarChart({
  data,
  keys,
  colors,
  labels,
  chartId,
}: {
  data: { label: string; values: number[] }[];
  keys: string[];
  colors: string[];
  labels: string[];
  chartId: string;
}) {
  const maxVal = Math.max(...data.flatMap((d) => d.values), 1);
  const chartH = 160;
  const chartW = 520;
  const paddingLeft = 40;
  const barGroupWidth = (chartW - paddingLeft) / data.length;
  const barWidth = Math.min(12, (barGroupWidth - 8) / keys.length);
  const groupGap = 2;
  const yTicks = [
    0,
    Math.round(maxVal * 0.25),
    Math.round(maxVal * 0.5),
    Math.round(maxVal * 0.75),
    maxVal,
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${chartW + 20} ${chartH + 50}`}
        style={{ width: "100%", minWidth: 320 }}
        role="img"
        aria-label={`${chartId} bar chart`}
      >
        <title>{chartId}</title>
        {yTicks.map((tick) => {
          const y = 10 + chartH - (tick / maxVal) * chartH;
          return (
            <g key={`tick-${tick}`}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={chartW + 10}
                y2={y}
                stroke="rgba(33,50,71,0.5)"
                strokeWidth="1"
              />
              <text
                x={paddingLeft - 4}
                y={y + 4}
                textAnchor="end"
                fill="#9AAAC0"
                fontSize="9"
              >
                {tick}
              </text>
            </g>
          );
        })}
        {data.map((group, gi) => {
          const groupX =
            paddingLeft +
            gi * barGroupWidth +
            barGroupWidth / 2 -
            (keys.length * (barWidth + groupGap)) / 2;
          return (
            <g key={group.label}>
              {group.values.map((val, ki) => {
                const barH = (val / maxVal) * chartH;
                const x = groupX + ki * (barWidth + groupGap);
                const y = 10 + chartH - barH;
                return (
                  <g key={keys[ki]}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barH}
                      fill={colors[ki]}
                      rx="2"
                      opacity="0.92"
                    />
                    {val > 0 && barH > 12 && (
                      <text
                        x={x + barWidth / 2}
                        y={y - 2}
                        textAnchor="middle"
                        fill={colors[ki]}
                        fontSize="7"
                        fontWeight="bold"
                      >
                        {val}
                      </text>
                    )}
                  </g>
                );
              })}
              <text
                x={paddingLeft + gi * barGroupWidth + barGroupWidth / 2}
                y={10 + chartH + 16}
                textAnchor="middle"
                fill="#9AAAC0"
                fontSize="10"
              >
                {group.label}
              </text>
            </g>
          );
        })}
        <line
          x1={paddingLeft}
          y1={10 + chartH}
          x2={chartW + 10}
          y2={10 + chartH}
          stroke="rgba(33,50,71,0.8)"
          strokeWidth="1"
        />
      </svg>
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
        {labels.map((lbl, i) => (
          <div key={lbl} className="flex items-center gap-1.5">
            <span
              className="w-3 h-2 rounded-sm"
              style={{ background: colors[i] }}
            />
            <span className="text-xs" style={{ color: "#9AAAC0" }}>
              {lbl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reports({ stats, history: _history }: ReportsProps) {
  const weeklyChartData = WEEKLY_DATA.map((d) => ({
    label: d.day,
    values: [
      d.inappropriate,
      d.insult,
      d.aggressive,
      d.bullying,
      d.sexual,
      d.discrimination,
      d.bodyshaming,
    ],
  }));

  const monthlyChartData = MONTHLY_DATA.map((d) => ({
    label: d.week,
    values: [
      d.inappropriate,
      d.insult,
      d.aggressive,
      d.bullying,
      d.sexual,
      d.discrimination,
      d.bodyshaming,
    ],
  }));

  const chartColors = [
    CATEGORY_CONFIG.inappropriate.color,
    CATEGORY_CONFIG.insult.color,
    CATEGORY_CONFIG.aggressive.color,
    CATEGORY_CONFIG.bullying.color,
    CATEGORY_CONFIG.sexual.color,
    CATEGORY_CONFIG.discrimination.color,
    CATEGORY_CONFIG.bodyshaming.color,
  ];

  const chartLabels = [
    "Inappropriate",
    "Insult",
    "Aggressive",
    "Bullying",
    "Sexual",
    "Discrimination",
    "Body Shaming",
  ];

  const chartKeys = [
    "inappropriate",
    "insult",
    "aggressive",
    "bullying",
    "sexual",
    "discrimination",
    "bodyshaming",
  ];

  const maxWordCount = TOP_BULLY_WORDS[0].count;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Analytics & Reports</h2>
          <p className="text-sm" style={{ color: "#9AAAC0" }}>
            Detection trends and category breakdown
          </p>
        </div>
        <div className="flex gap-3">
          <div
            className="px-3 py-2 rounded-xl text-center"
            style={{
              background: "rgba(249,115,22,0.1)",
              border: "1px solid rgba(249,115,22,0.3)",
            }}
          >
            <div className="text-lg font-bold" style={{ color: DANGER_COLOR }}>
              {stats.bullyingDetected}
            </div>
            <div className="text-xs" style={{ color: "#9AAAC0" }}>
              Bullying
            </div>
          </div>
          <div
            className="px-3 py-2 rounded-xl text-center"
            style={{
              background: "rgba(0,200,150,0.1)",
              border: "1px solid rgba(0,200,150,0.3)",
            }}
          >
            <div className="text-lg font-bold" style={{ color: SAFE_COLOR }}>
              {stats.safeMessages}
            </div>
            <div className="text-xs" style={{ color: "#9AAAC0" }}>
              Safe
            </div>
          </div>
          <div
            className="px-3 py-2 rounded-xl text-center"
            style={{
              background: "rgba(0,200,150,0.08)",
              border: "1px solid rgba(0,200,150,0.25)",
            }}
          >
            <div className="text-lg font-bold" style={{ color: SAFE_COLOR }}>
              {stats.accuracy}%
            </div>
            <div className="text-xs" style={{ color: "#9AAAC0" }}>
              Accuracy
            </div>
          </div>
        </div>
      </div>

      {/* Category summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {(
          Object.entries(CATEGORY_CONFIG) as [
            string,
            (typeof CATEGORY_CONFIG)[keyof typeof CATEGORY_CONFIG],
          ][]
        ).map(([key, cfg]) => (
          <div
            key={key}
            className="rounded-xl px-3 py-2.5 text-center"
            style={{
              background: `${cfg.color}12`,
              border: `1px solid ${cfg.color}30`,
            }}
          >
            <div className="text-xs font-bold" style={{ color: cfg.color }}>
              {cfg.label.split("/")[0]}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, #111C2C, #0F1A29)",
            border: "1px solid rgba(33,50,71,0.8)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <PieChart size={16} style={{ color: DANGER_COLOR }} />
            <span className="text-white font-semibold text-sm">
              Detection Breakdown
            </span>
          </div>
          <DonutChart
            bullying={stats.bullyingDetected}
            safe={stats.safeMessages}
          />
        </div>
        <div
          className="rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, #111C2C, #0F1A29)",
            border: "1px solid rgba(33,50,71,0.8)",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 size={16} style={{ color: "#A78BFA" }} />
            <span className="text-white font-semibold text-sm">
              Weekly Report (Last 7 Days)
            </span>
          </div>
          <GroupedBarChart
            data={weeklyChartData}
            keys={chartKeys}
            colors={chartColors}
            labels={chartLabels}
            chartId="Weekly Report"
          />
        </div>
      </div>

      <div
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #111C2C, #0F1A29)",
          border: "1px solid rgba(33,50,71,0.8)",
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={16} style={{ color: SAFE_COLOR }} />
          <span className="text-white font-semibold text-sm">
            Monthly Report (Last 4 Weeks)
          </span>
        </div>
        <GroupedBarChart
          data={monthlyChartData}
          keys={chartKeys}
          colors={chartColors}
          labels={chartLabels}
          chartId="Monthly Report"
        />
      </div>

      <div
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #111C2C, #0F1A29)",
          border: "1px solid rgba(33,50,71,0.8)",
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Award size={16} className="text-yellow-400" />
          <span className="text-white font-semibold text-sm">
            Most Flagged Words
          </span>
        </div>
        <div className="space-y-3">
          {TOP_BULLY_WORDS.map((item, idx) => {
            const cfg = CATEGORY_CONFIG[item.category];
            return (
              <div key={item.word} className="flex items-center gap-4">
                <span
                  className="w-6 text-sm font-bold text-center"
                  style={{ color: idx < 3 ? "#F59E0B" : "#9AAAC0" }}
                >
                  #{idx + 1}
                </span>
                <span className="w-24 text-sm font-semibold text-white">
                  {item.word}
                </span>
                <span
                  className="w-28 text-xs px-2 py-0.5 rounded-lg text-center"
                  style={{ background: `${cfg.color}20`, color: cfg.color }}
                >
                  {cfg.label.split("/")[0]}
                </span>
                <div className="flex-1 h-2 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(item.count / maxWordCount) * 100}%`,
                      background: cfg.color,
                    }}
                  />
                </div>
                <span
                  className="w-8 text-sm font-bold text-right"
                  style={{ color: cfg.color }}
                >
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
