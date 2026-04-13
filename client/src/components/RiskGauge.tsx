/**
 * RiskGauge Component
 * Design: Frost Clinic — 凍結リスクの半円ゲージ
 * 0〜100%のリスクスコアを視覚的に表示
 */

import { useEffect, useState } from "react";

interface RiskGaugeProps {
  score: number; // 0-100
  animated?: boolean;
}

function getRiskColor(score: number): string {
  if (score < 30) return "#22c55e";  // 緑 - 低リスク
  if (score < 60) return "#f59e0b";  // 黄 - 中リスク
  if (score < 80) return "#f97316";  // オレンジ - 高リスク
  return "#ef4444";                   // 赤 - 危険
}

function getRiskLabel(score: number): { label: string; desc: string } {
  if (score < 30) return { label: "低リスク", desc: "凍結の可能性は低いです" };
  if (score < 60) return { label: "中リスク", desc: "一部の行動に注意が必要です" };
  if (score < 80) return { label: "高リスク", desc: "凍結される可能性があります" };
  return { label: "危険", desc: "凍結リスクが非常に高い状態です" };
}

export default function RiskGauge({ score, animated = true }: RiskGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = score / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [score, animated]);

  const color = getRiskColor(score);
  const { label, desc } = getRiskLabel(score);

  // SVG半円ゲージ計算
  const radius = 80;
  const circumference = Math.PI * radius; // 半円の周長
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 200, height: 110 }}>
        <svg width="200" height="110" viewBox="0 0 200 110">
          {/* 背景トラック */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="rgba(219, 234, 254, 0.8)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* リスクゲージ */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * 90}`}
            strokeDashoffset={`${Math.PI * 90 - (displayScore / 100) * Math.PI * 90}`}
            style={{
              transition: animated ? "stroke-dashoffset 0.05s linear" : "none",
              filter: `drop-shadow(0 0 6px ${color}80)`,
            }}
          />
          {/* 目盛り */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = Math.PI - (tick / 100) * Math.PI;
            const x = 100 + 90 * Math.cos(angle);
            const y = 100 - 90 * Math.sin(angle);
            return (
              <circle
                key={tick}
                cx={x}
                cy={y}
                r={2}
                fill="rgba(148, 163, 184, 0.6)"
              />
            );
          })}
        </svg>

        {/* スコア表示 */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span
            className="text-4xl font-bold tabular-nums"
            style={{ color, fontFamily: "'Noto Serif JP', serif", lineHeight: 1 }}
          >
            {displayScore}
          </span>
          <span className="text-sm text-slate-500 mt-0.5">%</span>
        </div>
      </div>

      {/* ラベル */}
      <div className="mt-3 text-center">
        <span
          className="inline-block px-4 py-1 rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: color, boxShadow: `0 2px 8px ${color}50` }}
        >
          {label}
        </span>
        <p className="text-slate-500 text-sm mt-2">{desc}</p>
      </div>
    </div>
  );
}
