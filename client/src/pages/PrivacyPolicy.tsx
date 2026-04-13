/**
 * Privacy Policy Page
 * プライバシーポリシーページ
 */

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663552057848/CuC3B5sAkxkvMwjRYbotyX/freeze-ice-cube-FSBkjAE4nL7jTLD5mAinc6.webp"
            alt="氷のアイコン"
            className="w-7 h-7 object-contain"
          />
          <span className="font-bold text-slate-700 text-sm tracking-wide">凍結リスク診断</span>
        </div>
        <a
          href="/"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          診断に戻る
        </a>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">プライバシーポリシー</h1>
        <p className="text-slate-500 text-sm mb-8">最終更新日: 2026年4月14日</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <p className="text-base">
            本ウェブサイト（以下「当サイト」）では、ユーザーの個人情報の重要性を認識し、その保護を徹底するため、以下の通りプライバシーポリシーを定めます。
          </p>

          {/* 第1条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第1条（個人情報の定義）</h2>
            <p>
              本ポリシーにおける「個人情報」とは、氏名、メールアドレス、住所、電話番号その他特定の個人を識別できる情報を指します。
            </p>
          </section>

          {/* 第2条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第2条（個人情報の取得方法）</h2>
            <p className="mb-3">
              当サイトでは、ユーザーが以下の行為を行った際に個人情報を取得する場合があります。
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>お問い合わせフォームの送信</li>
              <li>コメントの投稿</li>
              <li>サービス利用時の入力情報</li>
            </ul>
            <p className="mt-3">
              取得する情報は必要最小限に留めます。
            </p>
          </section>

          {/* 第3条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第3条（個人情報の利用目的）</h2>
            <p className="mb-3">
              取得した個人情報は、以下の目的で利用します。
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>お問い合わせへの回答</li>
              <li>必要な情報の提供</li>
              <li>サービス改善および品質向上</li>
              <li>不正利用防止のための確認</li>
            </ul>
            <p className="mt-3">
              これら以外の目的で利用することはありません。
            </p>
          </section>

          {/* 第4条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第4条（個人情報の管理）</h2>
            <p className="mb-3">
              当サイトは、個人情報への不正アクセス、紛失、漏えい等を防止するため、適切な安全対策を講じます。
            </p>
            <p>
              また、個人情報は厳重に管理し、不要となった場合は速やかに削除します。
            </p>
          </section>

          {/* 第5条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第5条（個人情報の第三者提供）</h2>
            <p className="mb-3">
              当サイトは、次の場合を除き、第三者に個人情報を提供することはありません。
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>本人の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要な場合</li>
            </ul>
          </section>

          {/* 第6条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第6条（アクセス解析ツールについて）</h2>
            <p className="mb-3">
              当サイトでは、サイト改善のためアクセス解析ツールを利用する場合があります。
            </p>
            <p>
              このツールはCookieを使用し、匿名のトラフィックデータを収集しますが、個人を特定する情報は含まれません。
            </p>
          </section>

          {/* 第7条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第7条（広告について）</h2>
            <p className="mb-3">
              当サイトは今後、第三者配信の広告サービスを利用する場合があります。
            </p>
            <p>
              その際、ユーザーの興味に応じた広告を表示するためにCookieを使用することがありますが、個人情報を特定するものではありません。
            </p>
          </section>

          {/* 第8条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第8条（免責事項）</h2>
            <p className="mb-3">
              当サイトに掲載する情報は、可能な限り正確なものを提供するよう努めていますが、その正確性や安全性を保証するものではありません。
            </p>
            <p className="mb-3">
              当サイトの利用によって生じた損害等について、一切の責任を負いません。
            </p>
            <p>
              また、リンク先の外部サイトにおける情報・サービスについても責任を負いません。
            </p>
          </section>

          {/* 第9条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第9条（著作権について）</h2>
            <p className="mb-3">
              当サイトに掲載されている文章・画像・その他コンテンツの著作権は、特段の記載がない限り当サイト運営者に帰属します。
            </p>
            <p>
              無断転載・無断使用を禁止します。
            </p>
          </section>

          {/* 第10条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第10条（プライバシーポリシーの変更）</h2>
            <p className="mb-3">
              当サイトは、法令の変更や運営方針の変更により、本ポリシーを予告なく変更する場合があります。
            </p>
            <p>
              変更後のプライバシーポリシーは、本ページにて公開された時点で効力を持つものとします。
            </p>
          </section>

          {/* 第11条 */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">■ 第11条（お問い合わせ）</h2>
            <p>
              本ポリシーに関するお問い合わせは、当サイトのお問い合わせフォームよりご連絡ください。
            </p>
          </section>
        </div>
      </main>

      {/* フッター */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8 mt-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>&copy; 2026 凍結リスク診断. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
