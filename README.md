## 個人ポートフォリオサイト

ポートフォリオサイトは、下記リンクからご覧頂けます。

- https://my-portfolio-site-pink-pi.vercel.app/

## Web エンジニアとしての経歴

1. **株式会社インフラトップ**（技術メンター）

- 業務内容: プログラミングスクール「DMMWebCamp」の技術メンターとしてエンジニアへの転職を目指す受講生様に Web 系技術やプログラミングスキルを教えたり、カリキュラムで使用する Web アプリケーションのプロトタイプ作成に携わっておりました。

- **使用技術**: HTML5/CSS3/Javascript/Ruby/Ruby on Rails/PostgreSQL/Git/etc...

  2.**ソフトブレーン株式会社**（Web エンジニア）

- **業務内容**: 顧客総合満足度 No.1 の CRM/SFA の e セールスマネージャー Remix Cloud のカスタマイズ・ アドオン開発、保守、運用業務など幅広い範囲の業務に携わっておりました。

- **使用技術**: HTML5/CSS3/bootstrap/Javascript/Vue.js/vuetify/Java/Spring Boot/SQLServer/PostgreSQL/AWS/Eclipse/etc...

  3.**株式会社セイル**（Web エンジニア）

- **業務内容**: SES 営業をサポートするための SaaS サービス「SmartSES」の開発メンバーとしてフロントエンド・バックエンド開発に携わっております。

- **使用技術**: TailwindCSS/TypeScript/React.js/Next.js/Java/Spring Boot/MySQL/AWS/etx...

## 技術スタック&取得資格

1. Frontend

- HTML5/CSS3/bootstrap/TailwindCSS/Javascript/TypeScript/Vue.js/vuetify/React.js/Next.js

  2.Backend

- Ruby/Ruby on Rails/Java/Spring Boot

  3.DB

- PostgreSQL/MySQL/SQLServer

  4.Infra&Tools

- AWS/Eclipse/Vscode/Postman

  5.保有資格

- AWS Certified Solutions Architect – Associate
- AWS Certified Cloud Practitioner
- Oracle Certified Java Programmer, Gold SE 11
- Oracle Certified Java Programmer, Silver SE 11
- 基本情報技術者試験

## サイト環境情報

- Next.js: 16.3.8（2026-10-06 時点の安定版）
- React / React DOM: 19.3.0
- Node.js: 24.x（`.nvmrc` / `package.json` に指定）
- ルーティング: Pages Router
- デプロイ先: Vercel

## 開発・検証

```sh
nvm use
npm ci
npm run dev
```

```sh
# lint・型チェック・本番ビルド・HTTP スモークテスト
npm run check

# 本番ビルドに対する Chromium の desktop / mobile E2E テスト
npx playwright install chromium
npm run test:e2e
```

`npm run check` は全 4 ページ、共通ナビゲーション、背景画像、静的アセット、画像最適化、404 応答を検証します。E2E テストは画面表示、hydration エラー、リンク遷移、戻る・進む、プロフィール画像、入力欄を確認します。GitHub Actions でも両方を実行します。

Next.js 16 では `next lint` が廃止され、本番ビルドに lint は含まれません。このため ESLint CLI を独立して実行しています。ESLint は `eslint-config-next` の React プラグインが対応する 9 系を使用しています。

Vercel に反映する際は Node.js 24.x でビルドされることを確認してください。ブランチや PR の作成だけでは、本番サイトへの反映は完了しません。

### 既存の仕様

Contact のフォームには送信処理がありません。お問い合わせは表示されている SNS リンクをご利用ください。今回の更新では送信先や外部サービスは追加していません。
