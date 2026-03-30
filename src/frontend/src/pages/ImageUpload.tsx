import {
  Image,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { analyzeText } from "../lib/detection";
import type { AnalysisResult } from "../lib/detection";
import { OCR_TEXTS } from "../lib/mockData";

interface ImageUploadProps {
  onAnalyze: (
    text: string,
    result: AnalysisResult,
    source: "chat" | "image",
  ) => void;
}

const DANGER_COLOR = "#F97316";
const SAFE_COLOR = "#00C896";

export default function ImageUpload({ onAnalyze }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.match(/image\/(png|jpeg|jpg)/)) return;
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    setOcrText(null);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setOcrText(null);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    const extracted = OCR_TEXTS[Math.floor(Math.random() * OCR_TEXTS.length)];
    const res = analyzeText(extracted);
    setOcrText(extracted);
    setResult(res);
    onAnalyze(extracted, res, "image");
    setLoading(false);
  };

  const handleReset = () => {
    setImageFile(null);
    setImageUrl(null);
    setOcrText(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

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
            style={{ background: "rgba(249,115,22,0.15)" }}
          >
            <Upload size={16} style={{ color: DANGER_COLOR }} />
          </div>
          <div>
            <h2 className="text-white font-semibold">
              Image Upload & Analysis
            </h2>
            <p className="text-xs" style={{ color: "#9AAAC0" }}>
              Upload an image to scan for cybercrime content
            </p>
          </div>
        </div>

        {!imageFile ? (
          <label
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className="relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 block"
            style={{
              borderColor: dragOver ? DANGER_COLOR : "rgba(33,50,71,0.8)",
              background: dragOver
                ? "rgba(249,115,22,0.05)"
                : "rgba(11,18,32,0.4)",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
            />
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "rgba(249,115,22,0.1)",
                  border: "1px solid rgba(249,115,22,0.25)",
                }}
              >
                <Image size={28} style={{ color: DANGER_COLOR }} />
              </div>
              <div>
                <p className="text-white font-semibold mb-1">
                  Drop an image or click to browse
                </p>
                <p className="text-sm" style={{ color: "#9AAAC0" }}>
                  Supports PNG and JPEG files
                </p>
              </div>
              <div className="flex gap-2">
                {["PNG", "JPEG", "JPG"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{
                      background: "rgba(249,115,22,0.08)",
                      color: "#FB923C",
                      border: "1px solid rgba(249,115,22,0.2)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </label>
        ) : (
          <div className="space-y-4">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(33,50,71,0.8)" }}
            >
              <img
                src={imageUrl!}
                alt="Uploaded preview"
                className="w-full max-h-64 object-contain"
                style={{ background: "rgba(11,18,32,0.6)" }}
              />
              <button
                type="button"
                onClick={handleReset}
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:opacity-80 transition-opacity"
                style={{
                  background: "rgba(11,18,32,0.8)",
                  border: "1px solid rgba(33,50,71,0.8)",
                }}
              >
                <X size={14} className="text-gray-400" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-medium">
                  {imageFile.name}
                </p>
                <p className="text-xs" style={{ color: "#9AAAC0" }}>
                  {(imageFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{
                  background: "linear-gradient(135deg, #F97316, #C2410C)",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Scanning...
                  </>
                ) : (
                  <>
                    <Image size={14} /> Analyze Image
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div
          className="rounded-2xl p-8 flex flex-col items-center gap-4"
          style={{
            background: "linear-gradient(135deg, #111C2C, #0F1A29)",
            border: "1px solid rgba(249,115,22,0.3)",
          }}
        >
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 rounded-full border-4"
              style={{ borderColor: "rgba(249,115,22,0.2)" }}
            />
            <div
              className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
              style={{
                borderTopColor: DANGER_COLOR,
                borderRightColor: DANGER_COLOR,
              }}
            />
          </div>
          <div className="text-center">
            <p className="text-white font-semibold">Scanning Image for Crime</p>
            <p className="text-sm" style={{ color: "#9AAAC0" }}>
              Running AI analysis on image content...
            </p>
          </div>
        </div>
      )}

      {result &&
        ocrText &&
        !loading &&
        (() => {
          const isCrime = result.isBullying;
          const color = isCrime ? DANGER_COLOR : SAFE_COLOR;
          const bgColor = isCrime
            ? "rgba(249,115,22,0.12)"
            : "rgba(0,200,150,0.12)";
          const borderColor = isCrime
            ? "rgba(249,115,22,0.45)"
            : "rgba(0,200,150,0.45)";

          return (
            <div className="space-y-5" data-ocid="image.result.panel">
              {/* Big Crime Result Card */}
              <div
                className="rounded-2xl p-8 flex flex-col items-center gap-5 text-center"
                style={{
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  boxShadow: `0 0 40px ${color}18`,
                }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  {isCrime ? (
                    <ShieldAlert size={42} style={{ color }} />
                  ) : (
                    <ShieldCheck size={42} style={{ color }} />
                  )}
                </div>

                <div>
                  <div
                    className="text-2xl font-black tracking-widest uppercase mb-3"
                    style={{ color }}
                  >
                    {isCrime ? "CYBERCRIME DETECTED" : "NO CRIME FOUND"}
                  </div>
                  <div
                    className="text-7xl font-black leading-none"
                    style={{ color }}
                  >
                    {result.confidence}%
                  </div>
                  <div
                    className="text-sm font-semibold mt-2 uppercase tracking-wider"
                    style={{ color: isCrime ? "#FB923C" : "#4DDBBA" }}
                  >
                    Crime Likelihood: {result.confidence}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className="rounded-xl px-5 py-4"
                style={{
                  background: "rgba(17,28,44,0.9)",
                  border: "1px solid rgba(33,50,71,0.6)",
                }}
              >
                <div className="flex justify-between text-xs mb-2.5">
                  <span style={{ color: "#9AAAC0" }}>
                    Crime Confidence Level
                  </span>
                  <span className="font-bold" style={{ color }}>
                    {result.confidence}%
                  </span>
                </div>
                <div
                  className="h-3 rounded-full"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${result.confidence}%`,
                      background: isCrime
                        ? "linear-gradient(90deg, #C2410C, #F97316, #FB923C)"
                        : "linear-gradient(90deg, #00A878, #00C896, #4DDBBA)",
                      boxShadow: `0 0 8px ${color}60`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1.5">
                  <span style={{ color: "#4A6080" }}>0%</span>
                  <span style={{ color: "#4A6080" }}>100%</span>
                </div>
              </div>

              {/* Explanation */}
              <p
                className="text-sm text-center px-2"
                style={{ color: "#9AAAC0" }}
              >
                {result.explanation}
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                data-ocid="image.upload_button"
                style={{
                  background: "rgba(249,115,22,0.08)",
                  color: "#FB923C",
                  border: "1px solid rgba(249,115,22,0.2)",
                }}
              >
                Upload Another Image
              </button>
            </div>
          );
        })()}
    </div>
  );
}
