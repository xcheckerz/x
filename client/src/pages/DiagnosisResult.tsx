/**
 * Diagnosis Result Page
 * 診断結果表示ページ
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, AlertTriangle, Info, Shield, Share2 } from "lucide-react";
import RiskGauge from "@/components/RiskGauge";
import { type DiagnosisResult } from "@/lib/diagnose";

// ===== 詳細カード =====
function DetailCard({
  detail,
  delay,
}: {
  detail: DiagnosisResult["details"][0];
  delay: number;
}) {
  const statusConfig = {
    safe: { color: "#22c55e", bg: "bg-green-50", border: "border-green-100", icon: CheckCircle },
    warning: { color: "#f59e0b", bg: "bg-amber-50", border: "border-amber-100", icon: AlertTriangle },
    danger: { color: "#ef4444", bg: "bg-red-50", border: "border-red-100", icon: Shield },
  };
  const cfg = statusConfig[detail.status];
  const Icon = cfg.icon;
  const pct = (detail.score / detail.maxScore) * 100;

  return (
    <div
      className={`glass-card rounded-2xl p-4 border fade-in-up`}
      style={{ animationDelay: `${delay}s`, opacity: 0 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{detail.icon}</span>
          <span className="font-bold text-slate-700 text-sm">{detail.category}</span>
        </div>
        <Icon className="w-4 h-4" style={{ color: cfg.color }} />
      </div>

      {/* プログレスバー */}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${pct}%`,
            backgroundColor: cfg.color,
            boxShadow: `0 0 6px ${cfg.color}60`,
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{detail.description}</p>
        <span className="text-xs font-bold ml-2 shrink-0" style={{ color: cfg.color }}>
          {detail.score}/{detail.maxScore}
        </span>
      </div>
    </div>
  );
}

export default function DiagnosisResult() {
  const [, navigate] = useLocation();
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [email, setEmail] = useState("");
  const [hasAutoTweeted, setHasAutoTweeted] = useState(false);

  // リスクレベルに応じたツイートテキストを生成
  const generateTweetText = (diagnosisResult: DiagnosisResult): string => {
    let riskMessage = "";

    if (diagnosisResult.score >= 70) {
      riskMessage = "凍結リスク高めだった！";
    } else if (diagnosisResult.score >= 40) {
      riskMessage = "凍結リスク中程度だった...";
    } else {
      riskMessage = "凍結リスク低い！安全だ！";
    }

    const text = `${riskMessage}\n\n凍結リスク: ${diagnosisResult.score}%\nアカウント年齢: ${diagnosisResult.accountAge}\nツイート数: ${diagnosisResult.tweetCount.toLocaleString()}\nシャドーバン: ${diagnosisResult.shadowbanRisk}\n\n🧊 凍結リスク診断で確認してみて！\n${window.location.origin}`;

    return text;
  };

  // 自動ツイート機能
  const autoTweet = (diagnosisResult: DiagnosisResult) => {
    const text = generateTweetText(diagnosisResult);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    // ローカルストレージから診断結果とメールアドレスを取得
    const storedResult = localStorage.getItem("diagnosisResult");
    const storedEmail = localStorage.getItem("diagnosisEmail");

    if (storedResult && storedEmail) {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
      setEmail(storedEmail);

      // ページ読み込み時に自動ツイート（1回のみ）
      if (!hasAutoTweeted) {
        // 少し遅延させてからツイート画面を開く
        setTimeout(() => {
          autoTweet(parsedResult);
          setHasAutoTweeted(true);
        }, 500);
      }
    } else {
      // 結果がない場合はホームページにリダイレクト
      navigate("/");
    }
  }, [navigate, hasAutoTweeted]);

  const handleShareToTwitter = () => {
    if (!result) return;

    const text = generateTweetText(result);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleReset = () => {
    localStorage.removeItem("diagnosisResult");
    localStorage.removeItem("diagnosisEmail");
    navigate("/");
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #e0f2fe 0%, #dbeafe 30%, #e0e7ff 55%, #f1f5f9 85%, #ffffff 100%)",
      }}
    >
      {/* メインコンテンツ */}
      <div className="relative" style={{ zIndex: 2 }}>
        {/* ヘッダー */}
        <header className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663552057848/CuC3B5sAkxkvMwjRYbotyX/freeze-ice-cube-FSBkjAE4nL7jTLD5mAinc6.webp"
              alt="氷のアイコン"
              className="w-7 h-7 object-contain"
            />
            <span className="font-bold text-slate-700 text-sm tracking-wide">凍結リスク診断</span>
          </div>
        </header>

        {/* 診断結果セクション */}
        <section className="px-4 pb-32 max-w-2xl mx-auto">
          {/* 結果ヘッダー */}
          <div className="glass-card rounded-2xl p-6 mb-4 fade-in-up text-center">
            <p className="text-xs text-slate-400 mb-1">診断アカウント</p>
            <p className="text-sm font-bold text-slate-600 mb-4 truncate">{email}</p>

            {/* リスクゲージ */}
            <RiskGauge score={result.score} animated />

            {/* アカウント統計 */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-100">
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1">アカウント年齢</p>
                <p className="font-bold text-slate-700 text-sm">{result.accountAge}</p>
              </div>
              <div className="text-center border-x border-slate-100">
                <p className="text-xs text-slate-400 mb-1">ツイート数</p>
                <p className="font-bold text-slate-700 text-sm">{result.tweetCount.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1">シャドーバン</p>
                <p
                  className="font-bold text-sm"
                  style={{
                    color:
                      result.shadowbanRisk === "なし" ? "#22c55e"
                      : result.shadowbanRisk === "低" ? "#84cc16"
                      : result.shadowbanRisk === "中" ? "#f59e0b"
                      : "#ef4444",
                  }}
                >
                  {result.shadowbanRisk}
                </p>
              </div>
            </div>
          </div>

          {/* 詳細分析 */}
          <h3 className="text-sm font-bold text-slate-600 mb-3 px-1">詳細分析</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {result.details.map((detail, i) => (
              <DetailCard key={detail.category} detail={detail} delay={0.1 + i * 0.1} />
            ))}
          </div>

          {/* ボタングループ */}
          <div className="flex gap-3">
            {/* Twitterシェアボタン */}
            <button
              onClick={() => handleShareToTwitter()}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Xにシェア
            </button>
            {/* もう一度診断ボタン */}
            <button
              onClick={handleReset}
              className="flex-1 py-3 rounded-xl border-2 border-blue-200 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors"
            >
              別のアカウントを診断する
            </button>
          </div>
        </section>
      </div>

      {/* フッター */}
      <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm py-6 mt-12 relative" style={{ zIndex: 2 }}>
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; 2026 凍結リスク診断. All rights reserved.</p>
          <a
            href="/privacy"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            プライバシーポリシー
          </a>
        </div>
      </footer>
    </div>
  );
}
