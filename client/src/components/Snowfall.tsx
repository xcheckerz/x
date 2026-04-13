/**
 * Snowfall Component
 * Design: Frost Clinic — 雪が降るアニメーション
 * 参照サイト(socialxup.com)の雪エフェクトを再現
 */

import { useMemo } from "react";

const SNOWFLAKE_CHARS = ["❅", "❄", "✦", "❆"];

interface SnowflakeData {
  id: number;
  char: string;
  left: number;
  size: number;
  fallDuration: number;
  wobbleDuration: number;
  fallDelay: number;
  wobbleDelay: number;
  opacity: number;
  drift: number;
  color: string;
}

const COLORS = [
  "rgb(186, 230, 253)",
  "rgb(147, 197, 253)",
  "rgb(255, 255, 255)",
  "rgb(224, 242, 254)",
];

export default function Snowfall({ count = 50 }: { count?: number }) {
  const snowflakes = useMemo<SnowflakeData[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      char: SNOWFLAKE_CHARS[Math.floor(Math.random() * SNOWFLAKE_CHARS.length)],
      left: Math.random() * 100,
      size: 0.8 + Math.random() * 1.8,
      fallDuration: 10 + Math.random() * 15,
      wobbleDuration: 3 + Math.random() * 4,
      fallDelay: -(Math.random() * 20),
      wobbleDelay: -(Math.random() * 5),
      opacity: 0.6 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 80,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 1 }}>
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}em`,
            color: flake.color,
            animationDelay: `${flake.fallDelay}s, ${flake.wobbleDelay}s`,
            animationDuration: `${flake.fallDuration}s, ${flake.wobbleDuration}s`,
            opacity: flake.opacity,
            "--drift": `${flake.drift}px`,
          } as React.CSSProperties}
        >
          {flake.char}
        </span>
      ))}
    </div>
  );
}
