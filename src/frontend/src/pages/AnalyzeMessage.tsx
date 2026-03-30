import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  Send,
  Tag,
} from "lucide-react";
import { useState } from "react";
import type { AnalysisRecord } from "../App";
import { CATEGORY_CONFIG, analyzeText } from "../lib/detection";
import type { AnalysisResult } from "../lib/detection";

interface AnalyzeMessageProps {
  history: AnalysisRecord[];
  onAnalyze: (
    text: string,
    result: AnalysisResult,
    source: "chat" | "image",
  ) => void;
}

type Segment = { text: string; flagged: boolean; category?: string };

function renderSegments(segments: Segment[]) {
  let charPos = 0;
  return segments.map((seg) => {
    const key = `seg-${charPos}`;
    charPos += seg.text.length;
    if (seg.flagged && seg.category) {
      const cat = seg.category as keyof typeof CATEGORY_CONFIG;
      return (
        <mark
          key={key}
          className="px-1 py-0.5 rounded font-semibold"
          style={{
            background: `${CATEGORY_CONFIG[cat].color}30`,
            color: CATEGORY_CONFIG[cat].color,
            textDecoration: "none",
          }}
          title={CATEGORY_CONFIG[cat].label}
        >
          {seg.text}
        </mark>
      );
    }
    return <span key={key}>{seg.text}</span>;
  });
}

export default function AnalyzeMessage({
  history,
  onAnalyze,
}: AnalyzeMessageProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    const text = input.trim();
    await new Promise((r) => setTimeout(r, 1500));
    const res = analyzeText(text);
    setResult(res);
    onAnalyze(text, res, "chat");
    setLoading(false);
  };

  const exampleMessages = [
    "You are so stupid and ugly, nobody wants you around.",
    "You are a slut and everyone knows it, shameless whore.",
    "You fat loser, go lose weight, nobody likes fat people.",
    "You racist idiot, go back to your country you low caste beggar.",
    "I will murder you, pervert. You are dead meat.",
    "Hey! Great work today, really proud of what you accomplished!",
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div
        className="rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, #111C2C, #0F1A29)",
          border: "1px solid rgba(33,50,71,0.8)",
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <div
            className="p-2 rounded-xl"
            style={{ background: "rgba(139,92,246,0.15)" }}
          >
            <Send size={16} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Message Analyzer</h2>
            <p className="text-xs" style={{ color: "#9AAAC0" }}>
              AI-powered cyberbullying detection — 7 harm categories
            </p>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleAnalyze();
          }}
          placeholder="Type or paste a message to analyze for cyberbullying content..."
          className="w-full h-36 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 transition-all"
          style={{
            background: "rgba(11,18,32,0.8)",
            color: "#E7EEF8",
            border: "1px solid rgba(33,50,71,0.8)",
            caretColor: "#8B5CF6",
          }}
        />

        <div className="mt-3 mb-4">
          <p className="text-xs mb-2" style={{ color: "#9AAAC0" }}>
            Try an example:
          </p>
          <div className="flex flex-wrap gap-2">
            {exampleMessages.map((msg) => (
              <button
                type="button"
                key={msg.slice(0, 20)}
                onClick={() => setInput(msg)}
                className="text-xs px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  color: "#A78BFA",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                {msg.slice(0, 30)}...
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: "#4A6080" }}>
            Ctrl+Enter to analyze • {input.length} characters
          </p>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!input.trim() || loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: loading
                ? "rgba(139,92,246,0.4)"
                : "linear-gradient(135deg, #8B5CF6, #F97316)",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Send size={14} /> Analyze
              </>
            )}
          </button>
        </div>
      </div>

      {loading && (
        <div
          className="rounded-2xl p-8 flex flex-col items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #111C2C, #0F1A29)",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin" />
          </div>
          <div className="text-center">
            <p className="text-white font-semibold">Processing Message</p>
            <p className="text-sm" style={{ color: "#9AAAC0" }}>
              Running NLP analysis & keyword detection across 7 categories...
            </p>
          </div>
        </div>
      )}

      {result && !loading && (
        <div className="space-y-4 animate-fade-in">
          <div
            className="rounded-2xl p-5 flex items-center gap-4"
            style={{
              background: result.isBullying
                ? "rgba(249,115,22,0.1)"
                : "rgba(34,197,94,0.1)",
              border: `1px solid ${
                result.isBullying
                  ? "rgba(249,115,22,0.4)"
                  : "rgba(34,197,94,0.4)"
              }`,
            }}
          >
            {result.isBullying ? (
              <AlertTriangle size={28} className="text-orange-400 shrink-0" />
            ) : (
              <CheckCircle size={28} className="text-green-400 shrink-0" />
            )}
            <div className="flex-1">
              <div
                className={`text-lg font-bold ${
                  result.isBullying ? "text-orange-400" : "text-green-400"
                }`}
              >
                {result.isBullying
                  ? "\u26a0\ufe0f Cyberbullying Detected"
                  : "\u2705 Safe Message"}
              </div>
              <p className="text-sm mt-1" style={{ color: "#9AAAC0" }}>
                {result.explanation}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-bold text-white">
                {result.confidence}%
              </div>
              <div className="text-xs" style={{ color: "#9AAAC0" }}>
                Confidence
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: "linear-gradient(135deg, #111C2C, #0F1A29)",
              border: "1px solid rgba(33,50,71,0.8)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "#9AAAC0" }}
            >
              Message Content
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#E7EEF8" }}>
              {renderSegments(result.highlightedSegments)}
            </p>
            {result.flaggedWords.length > 0 && (
              <div
                className="mt-4 pt-4"
                style={{ borderTop: "1px solid rgba(33,50,71,0.8)" }}
              >
                <p
                  className="text-xs font-semibold mb-2"
                  style={{ color: "#9AAAC0" }}
                >
                  Flagged Words
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.flaggedWords.map((fw) => (
                    <span
                      key={`${fw.word}-${fw.category}`}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        background: `${CATEGORY_CONFIG[fw.category].color}20`,
                        color: CATEGORY_CONFIG[fw.category].color,
                        border: `1px solid ${CATEGORY_CONFIG[fw.category].color}40`,
                      }}
                    >
                      <Tag size={10} />
                      {fw.word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-5"
              style={{
                background: "linear-gradient(135deg, #111C2C, #0F1A29)",
                border: "1px solid rgba(33,50,71,0.8)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "#9AAAC0" }}
              >
                Sentiment Analysis
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-2xl font-bold ${
                    result.sentiment === "Positive"
                      ? "text-green-400"
                      : result.sentiment === "Negative"
                        ? "text-orange-400"
                        : "text-yellow-400"
                  }`}
                >
                  {result.sentiment}
                </span>
                <span className="text-sm" style={{ color: "#9AAAC0" }}>
                  {result.sentimentScore.toFixed(0)}% intensity
                </span>
              </div>
              <div className="space-y-2">
                {(["Positive", "Neutral", "Negative"] as const).map((s) => {
                  const score =
                    s === result.sentiment
                      ? result.sentimentScore
                      : s === "Neutral"
                        ? 50 - Math.abs(result.sentimentScore - 50) / 2
                        : 100 - result.sentimentScore - 10;
                  const color =
                    s === "Positive"
                      ? "#22C55E"
                      : s === "Negative"
                        ? "#F97316"
                        : "#EAB308";
                  return (
                    <div key={s}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: "#9AAAC0" }}>{s}</span>
                        <span style={{ color }}>
                          {Math.max(0, Math.round(score))}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.max(0, Math.round(score))}%`,
                            background: color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                background: "linear-gradient(135deg, #111C2C, #0F1A29)",
                border: "1px solid rgba(33,50,71,0.8)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "#9AAAC0" }}
              >
                Category Breakdown
              </p>
              <div className="space-y-2">
                {Object.entries(result.categoryCounts).map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background:
                            CATEGORY_CONFIG[cat as keyof typeof CATEGORY_CONFIG]
                              .color,
                        }}
                      />
                      <span className="text-xs" style={{ color: "#9AAAC0" }}>
                        {
                          CATEGORY_CONFIG[
                            cat as keyof typeof CATEGORY_CONFIG
                          ].label.split("/")[0]
                        }
                      </span>
                    </div>
                    <span
                      className="font-bold text-xs"
                      style={{
                        color:
                          count > 0
                            ? CATEGORY_CONFIG[
                                cat as keyof typeof CATEGORY_CONFIG
                              ].color
                            : "#4A6080",
                      }}
                    >
                      {count} {count === 1 ? "word" : "words"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {history.filter((h) => h.source === "chat").length > 0 && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #111C2C, #0F1A29)",
            border: "1px solid rgba(33,50,71,0.8)",
          }}
        >
          <button
            type="button"
            onClick={() => setShowHistory((h) => !h)}
            className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-purple-400" />
              <span className="text-white font-semibold text-sm">
                Analysis History (
                {history.filter((h) => h.source === "chat").length})
              </span>
            </div>
            {showHistory ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </button>
          {showHistory && (
            <div className="px-5 pb-5 space-y-3">
              {history
                .filter((h) => h.source === "chat")
                .slice(0, 10)
                .map((record) => (
                  <div
                    key={record.id}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{
                      border: "1px solid rgba(33,50,71,0.5)",
                      background: "rgba(11,18,32,0.4)",
                    }}
                  >
                    <span
                      className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                        record.result.isBullying
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {record.text.slice(0, 80)}
                        {record.text.length > 80 ? "..." : ""}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs font-medium ${
                            record.result.isBullying
                              ? "text-orange-400"
                              : "text-green-400"
                          }`}
                        >
                          {record.result.isBullying ? "Bullying" : "Safe"}
                        </span>
                        <span className="text-xs" style={{ color: "#4A6080" }}>
                          • {record.timestamp}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-xs shrink-0"
                      style={{ color: "#4A6080" }}
                    >
                      {record.result.confidence}% conf.
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
