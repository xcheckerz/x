/**
 * 凍結リスク診断ロジック
 * Design: Frost Clinic
 * ログイン情報（メールアドレス）を元に疑似的な診断を行う
 */

export interface DiagnosisResult {
  score: number;
  details: DiagnosisDetail[];
  accountAge: string;
  tweetCount: number;
  followRatio: number;
  shadowbanRisk: "なし" | "低" | "中" | "高";
}

export interface DiagnosisDetail {
  category: string;
  icon: string;
  score: number;
  maxScore: number;
  status: "safe" | "warning" | "danger";
  description: string;
}

// メールアドレスを元に疑似的なハッシュ値を生成
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
}

export function diagnose(email: string): DiagnosisResult {
  const seed = hashString(email.toLowerCase().trim());
  const r = (i: number) => seededRandom(seed, i);

  // 各スコアを疑似ランダムに生成
  const profileScore = Math.floor(r(1) * 30);
  const activityScore = Math.floor(r(2) * 25);
  const contentScore = Math.floor(r(3) * 25);
  const networkScore = Math.floor(r(4) * 20);

  const totalScore = Math.min(100, profileScore + activityScore + contentScore + networkScore);

  const tweetCount = Math.floor(r(5) * 5000) + 100;
  const followers = Math.floor(r(6) * 2000) + 10;
  const following = Math.floor(r(7) * 3000) + 50;
  const followRatio = Math.round((followers / following) * 100) / 100;

  const ageMonths = Math.floor(r(8) * 48) + 1;
  const accountAge = ageMonths < 12
    ? `${ageMonths}ヶ月`
    : `${Math.floor(ageMonths / 12)}年${ageMonths % 12 > 0 ? `${ageMonths % 12}ヶ月` : ""}`;

  const shadowbanOptions: DiagnosisResult["shadowbanRisk"][] = ["なし", "低", "中", "高"];
  const shadowbanRisk = shadowbanOptions[Math.floor(r(9) * 4)];

  const details: DiagnosisDetail[] = [
    {
      category: "プロフィール",
      icon: "👤",
      score: profileScore,
      maxScore: 30,
      status: profileScore < 10 ? "safe" : profileScore < 20 ? "warning" : "danger",
      description: profileScore < 10
        ? "プロフィールは問題ありません"
        : profileScore < 20
        ? "プロフィール画像や自己紹介の見直しを推奨"
        : "スパム的なプロフィールの特徴が検出されました",
    },
    {
      category: "ツイート活動",
      icon: "📝",
      score: activityScore,
      maxScore: 25,
      status: activityScore < 8 ? "safe" : activityScore < 16 ? "warning" : "danger",
      description: activityScore < 8
        ? "ツイート頻度は正常範囲内です"
        : activityScore < 16
        ? "短時間での大量ツイートが検出されています"
        : "異常なツイート頻度が検出されました",
    },
    {
      category: "コンテンツ",
      icon: "🔍",
      score: contentScore,
      maxScore: 25,
      status: contentScore < 8 ? "safe" : contentScore < 16 ? "warning" : "danger",
      description: contentScore < 8
        ? "コンテンツに問題は見当たりません"
        : contentScore < 16
        ? "一部のコンテンツがガイドライン違反の可能性"
        : "規約違反コンテンツが複数検出されました",
    },
    {
      category: "フォロー/フォロワー",
      icon: "👥",
      score: networkScore,
      maxScore: 20,
      status: networkScore < 7 ? "safe" : networkScore < 14 ? "warning" : "danger",
      description: networkScore < 7
        ? "フォロー比率は健全です"
        : networkScore < 14
        ? "フォロー/フォロワー比率に注意が必要です"
        : "スパム的なフォロー行動が検出されました",
    },
  ];

  return {
    score: totalScore,
    details,
    accountAge,
    tweetCount,
    followRatio,
    shadowbanRisk,
  };
}
