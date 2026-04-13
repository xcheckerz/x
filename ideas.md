# 凍結リスク診断 デザインアイデア

## 参照サイト分析
- 背景：水色〜薄青グラデーション（空と氷の世界観）
- 雪山のSVGイラストが底部に配置
- 雪が降るアニメーション（❅❄✦）
- 氷のキューブアイコン
- タイトルは青系グラデーションテキスト
- 検索フォームは白背景・角丸・ドロップシャドウ
- 右下に雪猫キャラクター

---

<response>
<probability>0.08</probability>
<text>

## アイデア1: 「Arctic Glass」— 北極の氷原をモチーフにしたグラスモーフィズム

**Design Movement**: Glassmorphism × Scandinavian Minimalism

**Core Principles**:
1. 半透明ガラス質のカード（backdrop-filter: blur）で奥行きを演出
2. 氷の結晶モチーフを随所に散りばめる
3. 余白を広く取り、情報を凛として見せる
4. 雪の降るアニメーションで世界観を強化

**Color Philosophy**:
- 背景：#e0f2fe → #dbeafe → #e0e7ff の縦グラデーション（空から氷へ）
- カード：rgba(255,255,255,0.6) backdrop-blur
- テキスト：#1e3a5f（深海ブルー）
- アクセント：#3b82f6（氷の青）
- ハイライト：#60a5fa（光の反射）

**Layout Paradigm**:
- 縦スクロール型シングルページ
- ヒーローセクション：タイトル＋ログインフォームを中央配置
- 結果セクション：左右非対称の2カラム（スコア大 / 詳細分析）
- 底部：雪山SVGで締める

**Signature Elements**:
1. 氷の結晶パーティクルアニメーション（CSS）
2. ガラス質のカードコンポーネント（白半透明＋blur）
3. 雪山シルエットSVG（複数レイヤー）

**Interaction Philosophy**:
- ログインフォームにフォーカス時：カードが軽くスケールアップ
- 診断ボタン：氷が溶けるようなリップルエフェクト
- 結果表示：フェードイン＋スライドアップ

**Animation**:
- 雪のパーティクル：ゆっくり落下（15〜20秒）、左右にゆらゆら
- タイトル：初期表示時にフロストエフェクト（blur→clear）
- プログレスバー：左から右へ氷が満ちるように塗られる

**Typography System**:
- 見出し：Noto Serif JP（凛とした和の雰囲気）
- 本文：Noto Sans JP（読みやすさ優先）
- スコア数値：tabular-nums + 大きめサイズ

</text>
</response>

<response>
<probability>0.07</probability>
<text>

## アイデア2: 「Cryo Terminal」— 氷結した近未来ターミナル

**Design Movement**: Cyberpunk × Ice Aesthetic

**Core Principles**:
1. 暗い背景に氷の青・シアンで発光するUI
2. モノスペースフォントで診断ツール感を演出
3. スキャンライン・グリッチエフェクトで緊張感
4. データ可視化を前面に出す

**Color Philosophy**:
- 背景：#0a1628（深夜の海）
- カード：#0f2040（氷の洞窟）
- アクセント：#00d4ff（液体窒素）
- 警告：#ff4444（凍結アラート）
- テキスト：#b0d4f0（霜）

**Layout Paradigm**:
- ターミナル風の縦長レイアウト
- 左側：ログインフォーム（端末入力風）
- 右側：診断ログのリアルタイム表示

**Signature Elements**:
1. スキャンラインオーバーレイ
2. タイピングアニメーション（診断プロセス表示）
3. 六角形グリッドの背景パターン

**Interaction Philosophy**:
- 入力時：緑のカーソル点滅
- 診断中：ログが流れるターミナル表示
- エラー時：赤いグリッチエフェクト

**Animation**:
- 起動時：CRTモニター点灯エフェクト
- 診断中：プログレスバーが点滅しながら進む
- 結果：数値がカウントアップ

**Typography System**:
- 全体：JetBrains Mono（等幅）
- タイトル：Orbitron（SF感）
- 本文：Noto Sans JP

</text>
</response>

<response>
<probability>0.09</probability>
<text>

## アイデア3: 「Frost Clinic」— 医療診断×氷の世界観（採用）

**Design Movement**: Medical Minimalism × Winter Landscape

**Core Principles**:
1. 清潔感のある白＋氷の青で「診断」の信頼性を演出
2. 参照サイトの雰囲気（雪山・雪・氷）を忠実に再現しつつ洗練
3. ログインフォームを医療カルテ風の入力UIで表現
4. 結果をゲージ＋詳細カードで視覚的に表示

**Color Philosophy**:
- 背景グラデーション：#e0f2fe → #dbeafe → #e0e7ff（空から夕暮れの氷原）
- カード：rgba(255,255,255,0.85) + 薄いblur
- プライマリ：#2563eb（氷の深い青）
- アクセント：#0ea5e9（空の青）
- 危険：#ef4444（凍結警告赤）
- テキスト：#1e3a5f

**Layout Paradigm**:
- 縦スクロール型
- ヒーロー：タイトル＋ログインフォームカード（中央）
- 診断結果：大きなゲージ＋4つの分析カード
- フッター：雪山SVG

**Signature Elements**:
1. 雪のパーティクルアニメーション（参照サイト再現）
2. 氷のキューブ/結晶アイコン
3. リスクゲージ（0〜100%の半円メーター）

**Interaction Philosophy**:
- ログインフォーム：フォーカス時に青いグロー
- 診断ボタン：ホバーで氷が溶けるようなグラデーション変化
- 結果：スムーズなカウントアップアニメーション

**Animation**:
- 雪のパーティクル：ゆっくり落下、左右にゆらゆら
- 結果表示：フェードイン＋ゲージが0から伸びる
- カード：staggeredフェードイン

**Typography System**:
- 見出し：Noto Serif JP Bold（格式）
- 本文：Noto Sans JP（読みやすさ）
- 数値：tabular-nums

</text>
</response>

---

## 採用デザイン：アイデア3「Frost Clinic」

参照サイトの世界観（雪山・雪・氷）を忠実に再現しつつ、ログインフォームを洗練されたカード型UIで実装。
